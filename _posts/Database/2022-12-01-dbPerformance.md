---
layout: post
title: How to deal with slowness or high latency on DB?
subtitle: Solutions to optimize the DB performance
date: 2022-12-01 00:24
author: Dongsoo Kim
image:
lead:
category: Database
---

As the project gets bigger, higher latency and slowness on Database are commonly found. So I list up some lists of mostly used solutions depends on situations and of course there should be clarifying process before the solutions. Following solutions is just from my personal experience and perspectives, so it is not always the answer and there must be way much better answer.

## **1. Denormalization**

In the stage of designing database structure, or if there is still chance to change database architecture, then **Denormalization** would be the first solution. I was really confused when I saw denormalized table in the real world. In my personal projects, I always design database cautiously especially in terms of normalization and try to minimize the duplicated columns throughout the tables. Even though table A frequently needs table B's b column, I rather used join two tables just for that column which I thought it is quite desirable way as it prevents Anomaly.

However, it requires me to do too much join than it is needed. It costs lots of complex query statement and reduce the performance becuase the process of join involves need, nested loop, merging, mapping in memory. That is why people use denormalization. Even though it costs duplicated data and wastes certain amount of storage, it increases the performance, and make the entities and queries more intuitive and sometimes, logically unified.

## **2. Optimize the code and query**

Well, this is the most frequent used and might be the first aid for dealing with slowness. I will not handle the optimizing process for query and code in this posts because it depends on person, situation, and a service model.
