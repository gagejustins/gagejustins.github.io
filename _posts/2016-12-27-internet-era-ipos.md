---
layout: post
title: "How the internet era radically changed the U.S. stock market"
date: 2016-12-27
---

A while back I wrote about Michael Lewis’s The New New Thing and how the internet created a fundamental, core change in the principles that had been guiding the U.S. stock market for what seemed like forever. While IPOs had traditionally only been for somewhat stable companies that made a modest profit, the 90’s turned that on its head — now, you could go public without having made any money whatsoever, and even without a clear business plan, in Jim Clark’s case(s).

Like any good data scientist, I felt awkward making claims without data to back them up. Fortunately, University of Florida Professor Jay Ritter’s research and data almost made me forget that I can’t afford Capital IQ. You can check out my [R code here](http://rpubs.com/gagejustins/internet-era-and-IPOs). This is the statistical story of the crazy 90's.
-----

The beginning point is that there was an absolute explosion of IPOs around the mid-late 1990's.

<br />
<img src="/assets/images/ipos/ipo1.png" alt="IPO Volume By Year" width="90%"/>
<br />

Volume peaked in 1996 with 677 initial public offerings. Interestingly enough, even though the dot-com bubble is generally assumed to span from 1995 to about 2001, the volume of IPOs here trails off after 1996, and by 2000, it wasn’t much higher than in the mid-late 80's.

But if you look closer, the aggregate value of these internet IPOs didn’t peak later, until 1999 and 2000.

<br />
<img src="/assets/images/ipos/ipo2.png" alt="Number of IPOs and Aggregate Proceeds" width="90%"/>
<br />

So what we see here is essentially the bubble — even though fewer companies were actually going public at the end of the 90’s, they were raking in way more cash than ever before.
-----

<h2>Where were these IPOs happening?</h2>
The lion’s share of these IPOs were obviously technology companies. Nasdaq was only founded in 1971, but boy did it ramp up quickly — already by 1983 it was bringing companies public at a volume 40x that of the NYSE. Yet, on the way towards the internet era, Nasdaq was losing share to the NYSE, and fast. The dot-com boom seems to have reversed that trend temporarily.

<br />
<img src="/assets/images/ipos/ipo3.png" alt="Share of Total IPOs By Exchange" width="90%"/>
<br />

The share differential returned to almost pre-90’s levels around 1999/2000, but then continued its steady decline, until the Nasdaq was temporarily overtaken by the NYSE around 2010 two separate times. Over the past few years though, the Nasdaq appears to have re-asserted its dominance.

This trend has a lot less to do with the NYSE improving and much more to do with a weaker technology market than in the past. The following graph shows the number of Nasdaq IPOs over time, and the drop is absolutely staggering. NYSE hasn’t been getting better — Nasdaq has just been getting much, much worse.

<br />
<img src="/assets/images/ipos/ipo4.png" alt="Number of Total IPOs By Exchange" width="90%"/>
<br />

This is really an incredible, incredible shift — Nasdaq IPOs skyrocket across the entire decade of the 90’s and then come absolutely crashing down when the bubble burst. What a ride.
-----

<h2>But what was the fundamental change? What was it about internet companies that drove the most IPOs in market history?</h2>
Simple: profitability.

As Lewis describes in The New New Thing, the traditional road to an IPO involved business plans, American executives, and initial profitability. The internet era laughed at these things.

If we take a look at the percentage of companies that went public in a given year that were profitable, the trend should not surprise us at all.

<br />
<img src="/assets/images/ipos/ipo5.png" alt="Share of IPOs Done By Profitable Companies" width="90%"/>
<br />

By the peak of the dot-com boom, barely 15% of companies that went public were profitable. That’s down from 91% in 1980.

The internet era created this core shift in public perception — what mattered was the distant future, and not the near one. It was now worth investing in companies even without a Discounted Cash Flow Analysis and valuations to make you feel comfortable; the public was betting on what was going to happen down the road, not what the present reasonably predicted. But statistically, this shift happened gradually, starting at 1990 and continuing the entire decade towards its nadir.

And when people bet on the future and totally ignore the present — well, you get pets.com.

It also shouldn’t be surprising that the peak of VC investment, in terms of share of IPOs by VC backed companies, coincided with this exact trend. The Venture Capitalists were the ones often pushing these companies to go public despite convention (after all, they stood to profit the most). Here are the two stats layered:

<br />
<img src="/assets/images/ipos/ipo6.png" alt="Share of IPOs By Profitability and VC Investment" width="90%"/>
<br />

The lowest point of profitable companies going public coincides directly with the peak share that VCs have ever had in IPOs. Hm…
-----
<h2>So what does this mean for today’s market?</h2>
Perhaps the most interesting part of this graph is what’s been going on over the past decade. The share of yearly IPOs that are VC backed is climbing back towards its peak, and almost reached it last year, in 2015. And at the same time, the share of those companies that are profitable has fallen off the cliff right back to 2000 levels.

In other words, we can summarize that:
<ul>
	<li>Nasdaq is asserting its dominance over the NYSE in terms of share of yearly IPOs</li>
	<li>The percentage of companies going public that are profitable is below 20%</li>
	<li>More than 50% of IPOs are by VC-backed companies</li>
	<li>These are the exact same circumstances that we just said made the late 90’s unique, and led to the dot-com bust</li>
</ul>

So is there a bubble that’s about to burst? Unclear. There’s an important distinction between these two periods: volume. There are very, very few technology companies going public today — just that when they do, they share similar characteristics (on paper) with dot-com era companies. 117 companies went public last year, less than 1/6 of the 1996 peak. This could be an important difference.

I don’t know the answer to this question any more than people who speak surely about it do. But hopefully, you’ll let the data speak for itself.



