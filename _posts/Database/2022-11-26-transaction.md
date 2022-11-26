---
layout: post
title: Transaction Mechanism, Isolation Level
subtitle: Principles for transaction and detail of isolation level
date: 2022-11-26 18:30
author: Dongsoo Kim
image: img/post_img/database/isolation.png
lead:
category: Database
---

Last week, one of our database stopped because one of my collegues did not commit his updates query and seems like it excludes other transaction in terms of Isolation level "READ_COMMITTED". I could understand how embarassing the moment was for him. And it reminds us of the importance of understanding transactions and isolation level.

## **1. Definition of Transaction**

Transaction can be defined as a group of tasks, or the minimum unit of queries.

## **2. 4 principles : ACID**

There are 4 principles for transaction which is well-known as "ACID".

1. **A**: Atomicity means "one of nothing". A single transaction should be done completely and the result would be applied to every related tables.<br>
   ex) I spend my money $100 out $1000 to John's account and John's account should be +$100 and mine is -$100. If only $100 minus in my deposit, and no +$100 in John's account, it violates the Atomicity.
2. **C**: Consistency means the result of transaction cannot violates and changes the data structure itself.
3. **I**: Isolation means each transaction should be independent to each other. Isolation levels is specified at the below.
4. **D**: Once it is committed, the result of transaction should be reflected to Database forever.

-- Lock : once transaction begins, the target row, table are locked and excluded from any other transaction until the transaction is done.

## **3. How it works**

Let's say I am going to query like below

```language
    UPDATE accounts SET balance = balance - 100 WHERE user = 'Dongsoo';
    UPDATE accounts SET balance = balance + 100 WHERE user = 'John';
    COMMIT; -- Or ROLLBACK;
```

First of all, I entered "UPDATE accounts SET balance = balance - 100 WHERE user = 'Dongsoo';"
then query processor look up the given row in the **`<DATA CACHE>`**. If there is no such data, it scan the **`<DATA FILE>`**.
Once the target row is loaded and stored to **`<DATA CACHE>`**, it archive the current status (before update) to **`<LOG CACHE-UnDo_Log>`**.
and the result of query in the **`<LOG CACHE-ReDo_Log>`**.

1. **`<LOG CACHE-UnDo_Log>`**
   log_1 accounts Dongsoo.balance 1000

2. **`<LOG CACHE-ReDo_Log>`**
   transaction_1 start
   transaction_1 Update accounts Dongsoo.balance 900

Secondly, the next query UPDATE accounts SET balance = balance + 100 WHERE user = 'John'; is executed.
the process repeat the exact same tasks written above, and the log result would be like,

1. **`<LOG CACHE-UnDo_Log>`**
   log_1 accounts Dongsoo.balance 1000
   log_2 accounts John.balance 0

2. **`<LOG CACHE-ReDo_Log>`**
   transaction_1 start
   transaction_1 Update accounts Dongsoo.balance 900
   transaction_1 Update accounts John.balance 100

Lastly, if I execute rollback, then DBMS read UnDo log backward and recover the data, and achieve the atomicity, consistency.

## **4. Isolation Level**

As you can see in the image on the top of this post, as you go down, the concurrency decreases however consistency increases.

1. **READ_UNCOMMITTED**: uncomitted data can be read by another transaction which is known as **"Dirty Read"**
   > **Dirty Read**
2. **READ_COMMITTED**: another transaction only can read the committed data.<br>
   > **Non-Repeatable Read**: Even though it was same select Query, the result can be different if the other transaction update that data.
3. **REPEATABLE_READ**: Isolation means each transaction should be independent to each other. Isolation levels is specified at the below.
   > **Phantom Read**: Even though it was same select Query, the result can be different if the other transaction update that data.
4. **SERIALIZABLE**: each transaction should wait until rows write-locked by other transactions becomes unlocked
