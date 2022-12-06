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

## **2. Mark, Sweep, Compact**

## **3. Marking Mechanism**

## **4. Minor GC, Major GC**

## **5. GC versions**
