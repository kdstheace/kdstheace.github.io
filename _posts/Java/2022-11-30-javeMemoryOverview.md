---
layout: post
title: Java Memory Layout
subtitle: Java Memory and JVM
date: 2022-11-30 10:44
author: Dongsoo Kim
image: img/post_img/java/java_memory_layout.jpg
lead:
category: Java
---

How JVM works on the Memory?

## **1. Overview of Java Memory**

Once .java file is compiled, it becomes .class file which includes its name, the number of class's fields, methods, and **byte code**. There is a class loader which load all the .class files and put it into **Method** area in **Runtime Data Area**.

**Runtime Data Area** consists of 5 areas. **Method** area which stores the class information from .class files and of course, static fileds. **Heap** stores instances created by "new" keywords, and becomes target of Garbage Collection. **JVM Stacks** stores each method when it is called as a "Frame" structure. And as its name, it has a stack data structure which is characterized with LIFO(Last In First Out). For example, once the methodA call methodB then, methodB stacks above methodA. After methodA is done its process, then it is removed from stack and thread goes back to the methodA. **PC Registers** stores current command of thread and **Native Method Area** manages the method written by C or C++.

Method and Heap area are shared by threads so developer needs to consider concurrency in the multi-thread environment. Otherwise, JVM Stacks, PC Registers, and Native Method Stacks belongs to each thread, so when the new thread is created, each of 3 areas are created as well.

## **2. How it works?**

After .class file is loaded by the Class Loader and put into Method, JVM brings byte codes from .class file to **Execute Engine** and translate it into the binary machine codes. With this proces, JVM enables the same Java application run in the different OS and that is why JAVA is well known for "Platform-independent".

While processing, if there is new instances initialized, those are stored in Heap area and every time the thread meets the method, it encapsulate with the Frame like the structure below

(image of Frame)

## **3. What is Frame in JVM Stacks?**
