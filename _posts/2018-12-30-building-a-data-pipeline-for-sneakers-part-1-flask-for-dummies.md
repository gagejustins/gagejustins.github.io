---
layout: post
title: "Building a Data Pipeline For Sneakers (Part 1): Flask for Dummies"
tags: [Data]
description: Tracking sneaker metrics from scratch
thumbnail: /assets/images/snql/burn.gif
date: 2018-12-30
---

## Introduction

Most undergrad programs for Data Science don’t give students the tools they need to operate in a modern data environment. Starting with the most basic engineering skills, concepts like SSH, Git, Web Servers, Virtual Environments, and Containers were not part of the curriculum I went through. This is actually an issue for standard Computer Science education too, but it gets compounded in Data Science because there’s another missing piece: Data Engineering.

Leaving aside the dearth of programs that actually teach you how to be a Data Engineer, there are basic skills and concepts from Data Engineering that Data Scientists need to succeed but have a hard time finding education for. Moving data around with Python scripts, database organization concepts like [the Star Schema](http://gkmc.utah.edu/ebis_class/2003s/Oracle/DMB26/A73318/schemas.htm), frameworks like [Airflow](https://airflow.apache.org/) and [Kafka](https://kafka.apache.org/), and ETL basics are immensely helpful skills and knowledge to have on a data team, but typically reside in the heads of Data Engineers (or whatever the equivalent position on your team is) only.  

In the spirit of [this popular Stitch Fix post](https://multithreaded.stitchfix.com/blog/2016/03/16/engineers-shouldnt-write-etl/) about how vertically integrated Data Scientists should actually be, I think that all of the skills I mentioned above make a stronger, more effective Data Scientist. I’ve been picking up a lot of this stuff at work by working on Data Engineering tickets and choosing high-unknown projects, and I wanted to solidify it (and build on it) by building something myself.

# SNQL

I’m [very into data](http://justinsgage.com/dataViz/united-states-by-state.html) and I’m [very into sneakers](http://justinsgage.com/topics/streetwear-market.html), which got me wondering: how could I track my sneaker usage? When did I buy things, and when did I sell them? How often do I wear different colors? Do the seasons of the year impact the materials I chose? How much money do I spend a month on kicks? I could gather all of this data manually in a spreadsheet, but it seemed like a great candidate for a proper pipeline. Here’s the idea:
 
<div style="text-align: center" class="top-padding-sm bottom-padding-sm">
	<img src="/assets/images/snql/snql-pipeline.png" width="75%">
</div>

The project starts with a web application that lets the user (me) input sneaker data – like purchases, walks, and cleans – into a form. Backend logic takes that data and does two things: (1) sends a lifecycle event (<span class="code">LCE</span>) to the events table, and (2) updates or creates a record in the sneakers table. Downstream, the data is transformed and loaded into a sneaker dimension table by an Airflow job. That table (and the current view) are the basis for any analytics that you’d want to do later on.

This paragraph above is pretty standard in a lot of these “building data pipelines” posts, but a few months ago I had absolutely no idea what big chunks of it meant. Let’s work on some definitions:

### What do all of these terms mean?

Good question!

<span style="font-weight: bold;">Web Application</span>: instead of inserting rows into tables manually, it would be nice to be able to write things down in HTML forms and have some code insert it into those tables. The web app – running on a Flask server (to be explained) – is the way to do that. It has a front end (<span class="code">HTML</span>, <span class="code">CSS</span>) and a backend (<span class="code">Python</span>).

<span style="font-weight: bold;">Lifecycle Events</span>: in product data, things that users do are usually captured as events – adding a sneaker, wearing a sneaker, selling a sneaker – each with an accompanying set of details. An example lifecycle event in our case would be that I wore a pair of sneakers, with the sneaker id, the sneaker name, and the time that I wore them. These events are very granular data, and it takes a bunch of work to turn them into data that can be used for actual analytics.

<span style="font-weight: bold;">Updating Records</span>: the “production” database in this project is the sneakers table, and the goal is to keep an up to date record of each sneaker in the collection for application purposes (not analytics purposes). Any time a major event happens (a purchase or a sale in our case), we update that table. For example, a new purchase adds a new row with the accompanying details, or a new sale marks that a given sneaker was sold, when, and how. 

<span style="font-weight: bold;">Sneaker Dimension Table</span>: a dimension table is the core element of analytics pipelines – it represents that state of a given object (sneaker!) at a given point in time. In practice, if we were to choose a given pair of sneakers – let’s say my pair of Suede Common Projects – the dimension table should tell me something like how many times they had been worn if I was looking two weeks ago. It’s also common to set up a current view that only contains records that are up to date.

_(Dimension tables are part of the Star Schema, which is a particular way of organizing your tables. I’m implementing it as I’ve learned at work (historical dimensions), but there are other approaches too.)_

<span style="font-weight: bold;">Analytics</span>: this is the end “product” – a series of visualizations and graphs that pull from the sneakers dimension table and answer the original questions that we started with. I use a [Javascript framework called D3](https://d3js.org/), and it will need to grab data from the sneakers dimension table on some regular basis (or on page load).

### How do you know that it's supposed to be built this way?

One of the biggest challenges in getting better at Data Engineering is the _unspoken knowledge_ – assumptions about how things should be structured and built. There's no good way to get this kind of knowledge without working in an organization with production data pipelines that you can learn from, or a mentor of some sort. 

The structure of:
* LCE table
* Production / state table
* Downstream dimension table

is a pretty standard one, and fit my analytics needs for this project.

This first post is about the top part of the stack: the web application and basic data tables. Here goes!

## What’s a Web Server, and Why Do I Need It?

I've built websites before ([my personal one is on Github Pages](http://justinsgage.com/)), and I've struggled to understand why I need a web server. What exactly is it, and what does it give me? Why can't I just show <span class="code">HTML</span> and <span class="code">CSS</span> files with absolute URL paths? 

I think the best way to explain web servers is to start with a set of things we want to do with this sneaker application. Here’s what we need:

* <span class="code">HTML</span> pages to show forms and put sneaker data into them
* Backend logic to take that inputted data insert it into a database
* The ability to pull list options on forms from the database (e.g. choose which sneakers to wear from a dropdown)

These needs all roll up into one broad idea: **we need a strong connection between our frontend and our database**.

There's a clear frontend (<span class="code">HTML</span>) and backend (Python + Database) here, and the simplest way to explain a web server is that it lets you create both of those. It also allows for URL routing, serving static assets (images, <span class="code">CSS</span>) efficiently, and limiting load from users. You'll find some combination of these features in most online explanations.

Without some sort of web server, it would be really difficult to move data around and execute functions whenever a user does something. 
 
### A simple web server: Flask

[Flask](http://flask.pocoo.org/) is a Python package that creates the most barebones web server you can in Python, and it's perfect for this kind of application. I'll skip the Flask introduction – there are [plenty of great ones out there](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) – and cover how I decided to use it / issues that beginners might run into. 

Remember how most of our needs centered around communicating between the front end and the database? Flask has a bunch of [methods and subpackages](https://flask-alembic.readthedocs.io/en/stable/) that exist solely for that purpose. And I totally ignored them!

<div class="top-padding-xs bottom-padding-sm" style="text-align: center;">
	<img src="/assets/images/snql/burn.gif" width="90%">
</div>

<h3>1) I set up a Postgres database instead of using Flask's SQLite</h3>

I like Postgres, and wanted to get some experience setting up databases and connections myself, especially on a remote server. I built the <span class="code">sneakers</span>, <span class="code">manufacturers</span>, and <span class="code">sneakers_events</span> tables through the <span class="code">psql</span> interface, or the [terminal that Postgres gives you](http://postgresguide.com/utilities/psql.html) to run commands.

<h3> 2) I deliberately did not use any of Flask's database functionality</h3>

An important part of modern Data Engineering (as far as I can tell) is what I'd call *Janky Python Scripts(TM)* – self contained Python programs that move data around, pull from APIs, etc. I wanted to get more experience building these from scratch and using Python packages like [psycopg2](http://initd.org/psycopg/), so I build the database connection myself.

In practice, that meant that instead of using methods like <span class="code">Sneakers.query.all()</span>, I built my own functions to query the sneakers database, and put them in a separate <span class="code">data_scripts</span> module. Some example (static) methods that I defined were <span class="code">list_available_sneakers</span>, <span class="code">insert_sneaker_row</span>, and <span class="code">insert_sneaker_event</span>.

<h3>3) Defining choices in Flask forms</h3>

Flask's [WTF extension](https://flask-wtf.readthedocs.io/en/stable/) (nope, not that WTF) lets you make simple forms through Flask. You define them in a <span class="code">forms.py</span> file as classes that inherit from a <span class="code">FlaskForm</span> base class, and can choose from a bunch of input field types like <span class="code">IntegerField</span>, <span class="code">StringField</span>, and <span class="code">SelectField</span>. 

I wanted to use a <span class="code">SelectField</span> to let me choose a pair of sneakers that I wanted to wear, and that required listing all of the available sneakers from the <span class="code">sneakers</span> table in the database. That wasn't too hard (I used that <span class="code">list_available_sneakers</span> function I mentioned), but I kept running into the same problem: I needed to reload the entire server to get those choices to update once I added a new sneaker. That was no good.

It took me a while to figure out, but I eventually figured that I could define a constructor (<span class="code">__init__</span>) that pulled those choices (<span class="code">list_available_sneakers</span>) whenever the form was initialized, and store them in a <span class="code">choices</span> variable. I passed that <span class="code">choices</span> variable to the <span class="code">SelectField</span> and all was well.

<h3>4) Running the whole shindig in routes</h3>

In Flask, you use a <span class="code">routes.py</span> file to execute backend logic whenever a particular page loads. For example, if you want some stuff to happen when a user hits <span class="code">http://sneakers.com/index.html</span>, you can put that logic in the appropriate function in <span class="code">routes.py</span> file. You put a little <span class="code">@app.route('somepath', methods = ['GET', 'POST', 'Whatever'])</span> decorator before the function you want to run, and it works just like that.

Another cool part of Flask is automatic URL routing – if you define a function to run at a given URL, you can reference any URLs that point to it with the <span class="code">url_for()</span> function. For example: if I define an <span class="code">add_sneakers</span> function that's supposed to run whenever users hit a URL, the <span class="code">url_for('add_sneakers')</span> call will always point correctly, even if you change the absolute path of the pointing URL.

<h3>5) Adding styling and images</h3>

Earlier, I mentioned that one of the points of a web server is to efficiently serve static assets like images to users. Some angry Stack Overflow users have argued against using Flask for this, but you can do it if you need – it's just not intuitive. Instead of just storing <span class="code">CSS</span>, or image files in your normal directories, you need to create a special <span class="code">static</span> folder.

You can pull from the folder using <span class="code">url_for('static', filename=filename)</span>. 

## Finishing up and next steps

After a few days of a ton of searching and a lot of re-doing, the finished product looked like this:

* A homepage with a description
* Tabs for adding sneakers, adding brands, removing sneakers, and using sneakers
* A Postgres database on the backend with 3 tables: <span class="code">sneaker_events</span>, <span class="code">sneakers</span>, and <span class="code">manufacturers</span>

Here's a screenshot of the homepage:

<div class="top-padding-sm">
	<img src="/assets/images/snql/snql-home.png" width="100%">
</div>

And here's what I was talking about with loading choices (it only shows the sneakers that I currently own):

<div class="top-padding-sm">
	<img src="/assets/images/snql/snql-use.png" width="100%">
</div>

The next part of this series will take a look at the second part of this project – building ETL and a downstream table with Airflow. Stay tuned! You can check out [the SNQL app repo here](https://github.com/gagejustins/snql).

<div class="top-padding-xs bottom-padding-sm" style="text-align: center;">
	<img src="/assets/images/snql/end.gif" width="90%">
</div>