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

## **3. Look closely on Heap Area**

## **4. Minor GC, Major GC**

## **5. GC versions**
