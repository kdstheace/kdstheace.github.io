---
layout: post
title: Garbage Collector & Heap Memory
subtitle: What triggers GC and how it changes memory
date: 2022-12-05 07:26
author: Dongsoo Kim
image: img/post_img/java/GC.png
lead:
category: Java
---

How familiar are you with Garbage Collector(GC)?
Garbage Collection is a process that removes **unreachable** objects on **Heap** area.
As Heap area on Java memory layout stores instances of any instantiated classes, mostly with 'new' keyword, it has to be reachable from its original source.
GC clarifies objects' original source by tracking all the way from the **GC Roots**.

## **1. GC Roots**

Specifically, 3 items below can be GC Roots, and starting points for tracking and checking whether the instances in Heap Area are reachable or not.

1. Data in JVM Stack Area
2. Static Data in Method Area
3. Ojects created by Java Native Method Interface

Here's an example.

<img src='img/post_img/java/gcTracking.jpg' alt='frame' width='600px'><br>
For Item #1, data in JVM Stack Area can be the 'Local Variable Array' in 'FrameA'. Let's say objB is referring to B in Method area and it continusouly refers to instance b in Heap area. In this case, instance b is **reachable** object. So it is not removed by GC.

For Item #2, static data in Method Area can be circle A(A.class). And A is referring to instance a in Heap Area, so instance a is reachable, and at the same time, when a refers to other instance like b, instance b is reachable as well.

Item #3, works the same way, if any object in the Native Method Area has reference to data in other memory and it leads to any instance in Heap Area, then that instance is defined as reachable by GC.

In result, only the instance d is left and it is marked as unreachable instance which will be target of Garbage Collection.

## **2. Mark, Sweep, Compact**

Overall, GC works following 3 steps; Mark, Sweep, Compact.
Mark is the tracking and checking process to distinct reachable and unreachable objects. Sweep is removing the unreachable objects at the memory and Compact is the process that cosolidates all of the free areas by moving data from later parts of the memory to unused locations in earlier parts. The compact process may not exist depending on which GC version it uses.

<img src='img/post_img/java/markSweepCompact.jpg' alt='frame' width='600px'><br>

In this case, data b, c, e are unreachable objects and removed by Sweep process. And the left objects are moved to the empty areas.

## **3. minor GC, Major GC: Look closely on Heap Area**

Heap area largely consists of 2parts, **Young Generation(YG)**, **Old Generation(OG)**. In YG, there are **Eden area**, **Survival01(S01)**, **Survival02(S02)**.
<img src='img/post_img/java/eden.jpg' alt='frame' width='600px'><br>

Eden area is the one we saw at the previous image(Simple Heap Memory). Instances are stored in this area firstly. And once the Eden is full, Mark-Sweep-Compact begins which is called **minor GC**. And any instances survived from minor GC process are stored in Survivor 0. Each survived instance has its own age starts from 1. This age is incremented +1 as minor GC occurs.

<img src='img/post_img/java/eden1.jpg' alt='frame' width='600px'><br>
While application keep working and store other instances in Eden area, 2nd minor GC would be triggered once the area is full. In the graph, you can see instance k, o are reachable and can be survived from Mark-Sweep_Compact process. This time, the instances stored in survivor 0 moved to survivor 1 with survived instances k, o.

<img src='img/post_img/java/eden2.jpg' alt='frame' width='600px'><br>
And once the age of instance reaches the certain age, (in the graph, 8) the old enough intances go to **Old Generation** area. This process continue until the Old Generation area is full and **Major GC** is triggered. Contrary to the minor GC, Mark-Sweep-Compact is done at Old Generation area.

<img src='img/post_img/java/eden3.jpg' alt='frame' width='600px'><br>

## **5. GC versions**

#### 1) Serial GC

1. GC process is undertaken by a single thread
2. Long **Stop The World** time<br>
   FYI) Stop The World: The time that every thread stops working while GC thread works

#### 2) Parallel GC

1. Java 8 default GC
2. Multi GC thread is available in YG area

#### 3) Parallel Old GC

1. Multi GC thread is available in both YG and OG areas

#### 4) G1 GC

1. Above Java 9 default GC
2. Heap area is divided into **Regions** and there are multiple Eden, Survivor, Old Generation areas.
3. JVM scanning at the regional level
