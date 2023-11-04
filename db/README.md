## Functionality of insert_into_json.py

  

This will first take the entries that you give it, parse them and insert into a list called *megalist*.

  

And then insert into csv. Then convert csv to json.

  

to run:

> $ python3 insert_into_json.py

  

You are given 4 options

- 1 --> add entries

- name1 price1 name2 price2 ... nameN priceN

- 2 --> delete entry from *megalist*

- name1 name2 ... nameN

- 3 --> view mega list

- 4 --> remove duplicates in csv

- 5 --> exit and write to csv and json

  
  
  

## format for inserting into db

  
  

(Name)(Descriptor), separate words with "-"

Some examples:

- Agua-Frescas-Hibiscus 3.59

- Meiji-Chocolate-Bar-Dark 1.59

- Lays-Potato-Chips-Barbeque-Large 5.99

  



  
  

dashes will be converted to spaces

  

## example usage

	$ python3 insert_into_json.py
	
	> please input name and price

	> add [1] | delete [2] | view [3] | remove csv duplicates [4] | exit [5]

	1

	> input name-price pairs:

	Agua-Frescas-Hibiscus 3.59 Meiji-Chocolate-Bar-Dark 1.59 Lays-Potato-Chips-Barbeque-Large 5.99 Agua-Frescas-Hibiscus 3.59

	> ['Agua-Frescas-Hibiscus', 3.59, 'Meiji-Chocolate-Bar-Dark', 1.59, 'Lays-Potato-Chips-Barbeque-Large', 5.99, 'Agua-Frescas-Hibiscus', 3.59] added to mega list

	  

	> add [1] | delete [2] | view [3] | remove csv duplicates [4] | exit [5]

	2

	> which entries to delete

	Meiji-Chocolate-Bar-Dark

	> entries deleted

	  

	> add [1] | delete [2] | view [3] | remove csv duplicates [4] | exit [5]

	3

	Agua-Frescas-Hibiscus 3.59

	Lays-Potato-Chips-Barbeque-Large 5.99

	> add [1] | delete [2] | view [3] | remove csv duplicates [4] | exit [5]

	4

	> [['name', 'price'], ['Agua Frescas Hibiscus', '3.59']]

	removed {'name', 'Agua Frescas Hibiscus'}

	  

	> add [1] | delete [2] | view [3] | remove csv duplicates [4] | exit [5]

	5

	> written to csv

	> written to json