---
layout: post
title: How to deal with slowness or high latency on DB?
subtitle: Solutions to optimize the DB performance
date: 2022-12-01 00:24
author: Dongsoo Kim
image: img/post_img/database/db_slow.jpg
lead:
category: Database
---

As the project gets bigger, higher latency and slowness on Database are commonly found. So I list up some lists of mostly used solutions depends on situations and of course there should be clarifying process before the solutions. Following solutions is just from my personal experience and perspectives, so it is not always the answer and there must be way much better answer.

## **1. Denormalization**

In the stage of designing database structure, or if there is still chance to change database architecture, then **Denormalization** would be the first solution. I was really confused when I saw denormalized table in the real world. In my personal projects, I always design database cautiously especially in terms of normalization and try to minimize the duplicated columns throughout the tables. Even though table A frequently needs table B's b column, I rather used join two tables just for that column which I thought it is quite desirable way as it prevents Anomaly.

However, it requires me to do too much join than it is needed. It costs lots of complex query statement and reduce the performance becuase the process of join involves need, nested loop, merging, mapping in memory. That is why people use denormalization. Even though it costs duplicated data and wastes certain amount of storage, it increases the performance, and make the entities and queries more intuitive and sometimes, logically unified.

## **2. Optimize the code and query**

Well, this is the most frequent used and might be the first aid for dealing with slowness. I will not handle the optimizing process for query and code in this posts because it depends on person, situation, and a service model.

## **3. Index**

Index provides faster speed to look up rather than just linear look up because the it use the B-tree data structure. Of course, it does not always guarantees the performance enhancement especially with frequent update, delete, insert queries, it is the most widely used method.

For more detail of **index**, go to this post : <a href=#> post</a>

## **4. Storage Replication**

When I participated in Samsung.com project, I wonder why it distinct the database with Master DB and slave DB and remember I spent hard time to get an authority to access the Master DB. (My manager gave me the task for designing the table, but operation team forgot to give me the authority to access Master DB) At that time, I thought it is just for backup and for security issues. But it can also be used to lower the burden from master DB while the slave DB conducts the data selection queries, insteads, Master DB only conducts inserts, updates the data.

## **5. Server Clustering**

Scaled out server clustering can be a good option to deal with server resources shortages. After checking out with linux command top, ps and if the slowness is caused by server resource, then load balance the data query traffics to the other Database Server.

## **6. Sharding**

Sharding is dividing table row by row. It can be seen as horizontal partitioning however, as sharding put those divided table into different database, it can achieve decentralization, security, scalability with the advantages of partitioning as well. There are several ways to do sharding according to how it defines shard keys.

#### 1) Range Sharding

It divides table with ranges of domains. For example, at the member table, and when it is partitioned by the member's name column, shard key can be abc, def, ghi... It is very intuitive but hard to balance the number of data in each database. Obviously we can imagine that members whose name starts with a or b or c will be more than members whose name starts with x or y or z.

#### 2) Modular Sharding

Shard key is defined with the result of modular. So it can guarantees the balanced amount of data on each node. For example, when the table is partitioned by the price % 3, the shard key would be 0, 1, 2 and distribute the data in somehow balanced way.

#### 3) Hash Sharding

Using hash key in sharding with hashing algorithm according to the number of nodes in clusters. However once the number of nodes increases, the hash size changes. So it has to change the entire shard keys in that case.

#### 4) Dynamic Sharding

Using Locator service to define shard keys. with Locator Service, manager can switch the key name at any time without changing the structure and method of partitions. As its name says, we can dynamically set the shard keys.
