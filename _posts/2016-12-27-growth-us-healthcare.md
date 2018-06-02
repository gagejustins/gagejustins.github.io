---
layout: post
title: "Visualizing the historical growth of U.S. healthcare costs, 1960–2015"
tag: Healthcare, Data
description: Why is the our system the most expensive in the world?
thumbnail: /assets/images/healthcare/healthcare1.png
date: 2016-12-27
---

<img src="/assets/images/healthcare/healthcare1.png" alt="Shkreli comic" width="60%" style="display: block; margin: auto">
<br />

Healthcare expenditures are a hot topic right now — partially because of ugly media storms for drug price movement like [Martin Shkreli](http://www.cnbc.com/2016/07/14/accused-fraudster-martin-shkrelis-trial-set-for-june-26.html) and [Epipen](http://fortune.com/2016/09/27/mylan-epipen-heather-bresch/) — but also because of the strange reality that healthcare costs us 17.1% of our GDP a year, as per recent figures. That’s 5% more than other developed countries like Germany, but our life expectancy (if that’s a proper measure of success) lags behind all of these places. It also helps that places like Oscar Health are [marketing this problem hard](https://www.quora.com/session/Mario-Schlosser/1), and arguing that they can solve it. Whatever the reason is, people are starting to pick up on this strange, strange reality.

But how did we get here? What grew, how, and when? Luckily, CMS.gov publishes data going all the way back to 1960 about different healthcare costs, including most government programs. There are plenty of [professional, detailed reports](https://www.cms.gov/Research-Statistics-Data-and-Systems/Statistics-Trends-and-Reports/NationalHealthExpendData/Downloads/HistoricalNHEPaper.pdf) about exactly how this crazy growth started, and I’m not trying to tackle that. This is just an simple attempt to visualize what’s been happening with U.S. Healthcare. You can check out my [R scripts here](http://rpubs.com/gagejustins/historic-US-healthcare-costs).

-----

Venture Capitalists like to look for what they call the hockey stick graph, which is exactly the structure that healthcare costs show over the past 50 years.

<br />
<img src="/assets/images/healthcare/healthcare2.png" alt="Total National Healthcare Expenditures" width="80%"/>
<br />

The interesting thing is that this growth isn’t linear; it’s exponential. Growth was moderate until around 1980, and then it took off like a rocket. The really strange thing is that none of this has to do with population growth. Here’s the population added on to the above graph.

<br />
<img src="/assets/images/healthcare/healthcare3.png" alt="National Healthcare Expenditures and Population" width="80%"/>
<br />

This graph isn’t exactly fair, since they’re on difference scales. Here are the annual growth rates interplayed, and they really look like they have nothing to do with each other.


Like we noted before, the growth rate looks to peak around 1980 around 16% or so — but then it’s been coming down ever since, with a few periods of volatility. Some argue that a lot of that had to do with [conservative policies that pushed free market competition](http://www.salon.com/2015/07/26/ronald_reagans_lasting_healthcare_legacy_how_80s_deficit_spending_and_conservative_ideologies_reshaped_the_healthcare_debate/) in place of Medicare / Medicaid expansion, but we’ll see below that the evidence suggests otherwise.

You’ll also notice the small spike since 2010, which validates the current perception. Healthcare costs aren’t growing at the same rate as in the 60’s-80’s, but they’re starting to get moving again.

<strong>In summary</strong>: healthcare costs have been growing a lot since the 1950’s, and peaked growth around 1980. This growth has absolutely nothing to do with population growth.

# Which parts of healthcare costs are growing the fastest?

Steady increase is often driven by extremely high growth in a few elements of a system. Is that going on here? Are there specific parts of healthcare that have been growing much faster than others?

To answer that question, we can take a look at the items with the top 10 growth rates in the system.

<br />
<img src="/assets/images/healthcare/healthcare4.png" alt="Top 10 Annualized Growth Rates" width="80%"/>
<br />

The three items to the left have 30% growth rates that dwarf everything else here. CHIP stands for Child Health Insurance Program, a government initiative introduced and implemented in 1998 that provides low cost insurance to children who’s parents make too much to quality for Medicaid. CHIP is broken down between Federal and State / Local here. Are these our culprits?

In short, no. Over its short 18 year history, CHIP on average runs about $8.5B a year, which is peanuts compared to most of the other programs we’re talking about. That being said, it’s growing the fastest in the system, so it’s something to keep an eye on.

The weird thing is that once you remove CHIP programs from the data set, there isn’t much variability in growth rates at all; the standard deviation of growth rates across line items is about 2.8%. Federal Medicaid has grown the fastest at an annual rate of around 15%, but most other items aren’t far behind.

<strong>In summary</strong>: the growth of healthcare expenditures isn’t being driven by a few high-growth expenses; it’s largely evenly distributed. Everything is costing more.

# How do government programs fit into this equation?

I mentioned that Medicare and Medicaid were curtailed a bit during the Reagan administration, but this doesn’t really do justice to the whole picture. The fact of the matter is that both Medicare and Medicaid have been steadily increasing their share of total healthcare expenditures, while private insurance has been on the decline. Overall, averaged across all years since 1960, private insurance accounts for a little over 50% of insurance expenditures.

<br />
<img src="/assets/images/healthcare/healthcare5.png" alt="Share of Total Expenditures by Insurance Type" width="80%"/>
<br />

Medicare and Medicaid represent 27% and 20% of total healthcare expenditures, respectively. Over time, these shares have slowly but steadily increased.

<br />
<img src="/assets/images/healthcare/healthcare6.png" alt="Share of Total Expenditures by Insurance Type" width="80%"/>
<br />

Leaving aside the initial shaking around when the programs were created, private insurance as a share of total expenditures has dropped from 56% in 1967 to 47% in 2015. The lion’s share of the difference was eaten by Medicaid, which has grown from 17% in 1967 to 24% in 2015. Medicare has only grown ~2% over the period.

<strong>In summary</strong>: government insurance programs grew only slightly faster than private ones from 1960–2015. Total expenditure growth is even across these groups too.

# Conclusion

There are a number of solid reasons why these costs have been growing, including increasing procedure costs, more expensive equipment, ill-structured incentives, and the employer provider model. This project doesn’t address any of that, and is just meant to visualize what’s been happening since 1960. I hope it’s helpful! If you have any questions or comments, [email me](mailto:gagejustins@gmail.com) or shout at @jgage718.