---
layout: post
title: "Machine learning abstraction and the age of AI ease" 
date: 2017-09-13
---


## New tools are making it easier than ever to get working AI up and running

_Note: all of the following applies to creating and training AI and Machine Learning models. Deploying those models at scale is a much different and more difficult challenge, and will be the subject of a follow-up post._

I like to say (often to myself, because I do that kind of thing) that things are getting both simpler and more complicated in the world of writing software.

On the one hand, the expectations for an MVP today exceed anything we’ve ever seen — software is expected to run and not crash, work across devices, etc.

But on the other hand, tasks that used to be entire projects in of themselves, like setting up a web server, can now be done with just a few lines of, for example, Python code using [Flask](https://en.wikipedia.org/wiki/Flask_%28web_framework%29). Developers are expected to do more but have more tools at their disposal to do it with.

Abstraction is a trend across the entire technology landscape (e.x. Squarespace, AWS), and [Machine Learning](https://machinelearnings.co/a-humans-guide-to-machine-learning-e179f43b67a0) and AI are no exception (note: as always, for simplicity I’ll be using these terms interchangeably even though they don’t really mean the same thing).

It’s almost expected that good products will have some sort of AI under the hood today, but it also has never been easier to get AI up and running. The technical expectations, like model accuracy and speed, are high — but getting there is becoming increasingly accessible.

_Put differently, the [supposed shortage of Machine Learning Engineers](https://www.forbes.com/sites/forbestechcouncil/2017/06/26/machine-learning-is-creating-a-demand-for-new-skills/#51afd397ae2a) doesn’t seem to have slowed the proliferation of companies using AI._

As I wrote a while back in [a post on the topic](/blog/2017/09/06/different-types-of-ai-companies), there are 3 different types of AI companies. Core AI companies improve the AI pipeline, Application AI companies help with a specific task like text or images, and Industry AI companies apply AI to specific verticals like customer service or cyber. While Core AI companies and Application AI companies innovate in using novel machine learning methods or simplification and thus need to get into the nitty gritty of the stuff, Industry AI companies are unique in that, well, they don’t.

The Open Neural Network Exchange, [jointly announced by Facebook and Microsoft](https://techcrunch.com/2017/09/07/facebook-and-microsoft-collaborate-to-simplify-conversions-from-pytorch-to-caffe2/), is a good example for this melding of research and product. Curiously, as research burrows into more and more complex types of AI algorithms, creating working ones on the production side is, in many ways, getting easier.

Abstraction is defined as dealing with ideas instead of events. In the context of AI, that means worrying more about what the right algorithm is and less about how to implement it. Another way of looking at it, for those technically inclined, is as an API call (abstracted) vs. a self implemented function or series of functions.

In my time as a VC analyst focusing on this area, I’ve been seeing lower and lower barriers to entry into the Industry AI space. *Machine Learning is being abstracted into a project that can take just a few days and a few hundred lines of code or less*. There are a couple of trends that I think are pushing this envelope forward.

# The rise of application AI
In some ways, applying AI has a sort of power law — the overwhelming majority of applications will involve some combination of text, images, and videos, while a much smaller share will involve other inputs.

Accordingly, we’ve seen a number of successful companies developing software to make it easy for you to analyze your data. If you wanted to do this just 5 years ago, you would have needed to design custom stuff from the ground up.

These companies target mostly developers (a deliberately vague designation that we’ll return to). [Clarifai](https://www.clarifai.com/), a NY-based startup that helps you analyze images and videos, sells to application developers. Predicting / labeling your images is as easy as a few lines of code:

<br />
<img src="/assets/images/abstraction/abs2.png" alt="Clarifai API Snippet" width="80%">
<br />

Even for today’s standards this simplicity is notable. Creating basic models with typical 3rd party packages (see blow), while far abstracted already, will usually take much more code than this.

[Algorithmia](https://algorithmia.com/), a startup that automates and simplifies deployment of ML algorithms among other things (update: I work here now!), proudly writes on its site “for developers by developers.” The pitch with both of these examples is abstraction: taking a process that’s inherently difficult for programmers and turning it into just an API call.

New open source 3rd Party packages and communities
The other major driving force here is on the actual development side, and it’s the ease with which sophisticated custom models can be trained and deployed. When I started writing models in Python and R in school, I was legitimately surprised by how easy it was to get these things up and running. Using pre-made modules instead of writing the algorithm yourself always involves a trade-off that experts will sneer at, but is [almost always a good starting point](https://blog.intercom.com/machine-learning-way-easier-than-it-looks/).

Modules like _[Scikit-Learn](http://scikit-learn.org/stable/)_ and Google’s _[TensorFlow](https://www.tensorflow.org/)_ offer key functionalities like feature extraction, clustering, and dimensionality reduction through a bunch of function calls. Extracting text sentiment with _[Textblob](https://textblob.readthedocs.io/en/dev/)_ in Python or _[Syuzhet](https://cran.r-project.org/web/packages/syuzhet/vignettes/syuzhet-vignette.html)_ in R takes only a few hours, and allowed me to create cool projects like [this NYU Review Tool for a final project](https://gage-justin.shinyapps.io/master_app/).

Using these packages requires a bunch of data cleaning and customization, so it’s not as simple as a service like Clarifai, but it’s free and more flexible. You can achieve non-trivial accuracy using these algorithms out of the box, assuming you properly adjust for overfitting and tinker with the right parameters. It’s no surprise that _[cluster](https://www.rdocumentation.org/packages/cluster/versions/2.0.5?)_ was one of the [5 most downloaded R packages in 2016](https://www.datacamp.com/community/blog/the-5-most-downloaded-r-packages#gs.XzNDBvk). Most major Python frameworks for Machine Learning have seen [significant usage growth too](http://redmonk.com/fryan/2016/06/06/a-look-at-popular-machine-learning-frameworks/):

<br />
<img src="/assets/images/abstraction/abs3.png" alt="Stack Overflow Questions" width="55%">
<br />

The number of Stack Overflow questions on a topic is generally viewed as a rough proxy for adoption and usage. Ironically, this graph about Python package usage looks like it was generated using ggplot2, an R package.
This growth is a key piece in the abstraction story. As more and more developers use these packages, the open source community grows and they get better. In fact, Python’s Pandas framework for data manipulation has gotten so popular that it’s becoming difficult to support:

<br />
<img src="/assets/images/abstraction/abs4.png" alt="Stack Overflow Questions" width="40%">
<br />

(Wes is the author of the Pandas package, as well as a number of other notable data science frameworks and resources.)

Deploying and scaling up these processes are complex and beyond the scope of this section, but the conclusion is clear: It’s just much easier than it used to be to write and use Machine Learning models.

# Who cares? 2nd order consequences
Trends are irrelevant unless they create some sort of tangible change, and abstraction is changing the game in a number of ways.

## 1. User Democratization and Machine Learning Engineers
The first relevant shift concerns who is actually creating AI today. While a few years ago you might have needed a dedicated team member (or team) just for writing, maintaining, and improving algorithms, that function can now be done by almost any developer in the early stages. As long as you understand the constraints of your infrastructure, making calls to the Clarifai API doesn’t need a Machine Learning Engineer. Using open source packages is a bit more complex, but you can learn the basics in a few weeks.

Even at giant tech companies like Google where real Machine Learning Engineers are actually needed to work on core stuff, leadership is pushing this trend. Fei-Fei Li, the chief scientist of artificial intelligence and machine learning at Google Cloud, [recently said](https://www.forbes.com/sites/gilpress/2017/03/12/ai-and-community-development-are-two-key-reasons-why-google-may-win-the-cloud-wars/#3e0c302e5b81) that “the next step for AI must be democratization. This means lowering the barriers of entry, and making it available to the _largest possible community of developers_, users and enterprises.” Creating and maintaining relatively easy-to-use modules like TensorFlow open up AI to all kinds of developers.

Even companies that started without aspirations for AI are taking advantage of this new opportunity. An employee at Clarifai, the Application AI company mentioned above, told me that within the typical build vs. buy paradigm in SaaS, customers will often choose to build just so their engineers can get some AI experience. Even if the end product ends up being inferior and the customer needs to come back to Clarifai, at least their engineers picked up some valuable know-how along the way. This kind of investment would not have been realistic just a few years ago.

User diversity is good. It leads to better and more balanced product updates and timelines. Democratization can speed up the rate of AI progress and enable even better solutions down the road.

## 2. More AI Companies

Trend #1 is exciting for startups, because it means that at least in the early stages they don’t need to hire a specialized team member to integrate AI into their products (scaling up is a different story). Adding AI into your company’s offering has shifted from a question of “if” to a question of “when.”

More AI is good, because it means more problems become the purvey of quantitative analysis; but it also means that AI will inevitably be applied to topics that are totally irrelevant. This sharp tweet by Paige Bailey captures the current mindset of some entrepreneurs:

<br />
<img src="/assets/images/abstraction/abs5.png" alt="Stack Overflow Questions" width="40%">
<br />

AI is not the solution to every problem and does not add value to every product, but when it’s this easy to integrate it companies can fall for this trap. Companies often think that “sprinkling AI” on their startup will make it more attractive to investors, but investors who understand the space can discern between makers and fakers. The abstraction of AI has clouded the landscape to the point where almost every startup is using some sort of AI, and it’s up to customers, investors, and the market to determine if it really should be there or not. As with blockchain, I try to ask every Industry AI company I speak with this question: _why is AI or Machine Learning the best way to solve this problem?_

## 3. Augmented Competitive Landscape — Strong Datasets

I’ve been using the term “abstraction,” but some would go as far as to call what’s happening _commoditization_. Leaving the experimental Core AI technologies aside, the abundance of tools that allow sophisticated AI effectively means that very few startups can genuinely claim AI as a competitive advantage. A company of 3 Stanford PhDs that developed in-house algorithms is one thing, but most early stage companies will not have AI that is technically far superior to the competition . When founders without a very relevant background claim complicated algorithms as a competitive moat, I’m generally skeptical.

So what exactly does represent a sustainable competitive advantage in AI these days? The simplest answer is data — some sort of proprietary dataset that competitors don’t have and can’t gain access to, at least for now. To use an example from Jason Black’s [article on the topic](https://blog.rre.com/cutting-through-the-machine-learning-hype-5865920f22), only Facebook has access to its social graph, so only Facebook can develop algorithms that utilize it. Getting access to an initial dataset [can be difficult](https://machinelearnings.co/why-ai-companies-cant-be-lean-startups-734a289792f5), and I’ve heard some great stories about founders that tried scrappy ways to acquire it.

There are a couple of different ways to monetize an interesting data set. The most straightforward way is to sell access to your data, often to hedge funds or financial institutions. Another perhaps more common way is to build some sort of interesting product on top of it. A great example is X.ai, a startup that offers an AI-powered digital assistant to schedule your meetings for you. The company gathered a semi-proprietary dataset of thousands of back-and-forth scheduling emails, and used them to train their AI.

Competing based on a unique data set is interesting because it requires continuous iteration to maintain. If you collect a unique initial dataset, it loses value over time as competitors garner similarly useful data. Going back to the two different types of dataset-based businesses, you can run into issues on both ends. If your business model involves selling your proprietary data to third parties, it becomes less valuable as more people have access to it (the rare anti-network effect also found in extreme luxury goods). And if you’ve built a product on top of a unique dataset, you also run the risk of another company gathering the same data or building a competitive product on another set of data.

You can maintain and improve your competitive edge over time by continually augmenting your dataset. If you’re selling a dataset directly, this is really tough — you’ll need to find new data that upgrades your dataset’s utility, or boost it by refining your data in some way. There’s a limit to how much of this can be done, which is why these kind of direct sale businesses can sometimes be less attractive to VC investors.

But if you’ve built a product on top of a dataset, you have more options. You want to be in the position where more product usage increases the utility of the dataset and product overall. For example, as X.ai sells to more customers, they get more scheduling emails in their dataset, which means they can continually improve the accuracy of their models and add new features. Improving model accuracy over time is key to scaling an AI-focused company, especially as your later customers who weren’t early adopters are more likely to expect pinpoint precision.

A lot of the “fake it ‘till you make it” attitude in tech stems from this core idea — creating good models requires feedback. The AI you create off an initial dataset, as long as it’s good enough to get the ball rolling, can bring in the early users that end up beefing up the dataset to the point of commercial viability and long-term competitiveness.

Another way for AI companies to win is by applying AI to a new or untouched topic. As mentioned above, the age of AI ease makes it possible for founders with experience in obscure verticals to utilize AI-based solutions without extensive backgrounds in Machine Learning. I’ve been seeing more and more companies that apply AI to long-tail kinds of issues, like marksmanship in shooting ranges. Succeeding in these kinds of plays can end up being much more of a business problem than a technology problem.

# Conclusion
AI is definitely becoming more democratized, as new Application AI companies and the increasing robustness of open source frameworks make it easier than ever to create and use models on your data. This has implications far beyond the startup space, and may very well [determine who wins the cloud wars](https://stratechery.com/2016/how-google-cloud-platform-is-challenging-aws/).

I’m excited — I think that making AI easier to use will end up leaving us with more solved problems, even if the road there isn’t always smooth.