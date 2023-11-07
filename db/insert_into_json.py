
import json
import csv
import os
# this python script will additively allow you to put name, price and other things to a csv

class item_info:
    def __init__(self, name, price):
        self.name = name
        self.price = price

def main():
    print("please input name and price")
    mega_list = {}
    name = ""
    price = 0
    
    while(1):
        print("add [1] | delete [2] | view [3] | csv info [4] | exit [5]")
        c = input()
        if int(c) not in [1, 2, 3, 4, 5]:
            continue

        if c == "1":
            print("input name-price pairs: ")
            inp = input()
            arr = inp.split()
            l = len(arr)
            info = []
            lst = []
            for i in range(0, l, 2):
                name, price = arr[i], float(arr[i + 1])
                lst.append(item_info(name, price))
                info += [name, price]

            for item in lst:
                mega_list[item.name] = item

            print(str(info) + " added to mega list\n")
        
        elif c == "2":
            print("which entries to delete")
            delete = input().split()
            for d in delete:
                del mega_list[d]

            print("entries deleted\n")

        elif c == "3":
            for name in mega_list:
                item = mega_list[name]
                print(item.name, item.price)

        elif c == "4":
            header = ["id", "name", "price"]
            csv_file_path = 'item_info.csv'
            column_index = 1
            unique_names = set()
            removed_names = set()

            with open(csv_file_path, 'r', newline='') as file:
                reader = csv.reader(file)
                data = list(reader)
                print("CSV size: " + str(len(data)))
                # Iterate through the rows and update the set of unique names

            print()
    

            
                
        else:
            # what id are we on?
            id_count = 0
            unique_names = set()
            # write to csv and convert that to json
            csv_file = 'item_info.csv'
            header = ["id", "name", "price", "img", "category"]
            if not os.path.exists(csv_file):
                f_output = open(csv_file ,'w')
                writer = csv.DictWriter(f_output, fieldnames=header)
                writer.writeheader()
            else:
                # set id to next id
                with open("item_info.csv") as f:
                    reader = csv.reader(f)
                    for row in reader:
                        id_count += 1
                        # print(row)
                        unique_names.add(row[1])


                f_output = open(csv_file, 'a')
                writer = csv.DictWriter(f_output, fieldnames=header)
            
            # print(id_count, unique_names)

            for elem in mega_list:
                item = mega_list[elem]
                if item.name.replace('-', ' ') not in unique_names:
                    writer.writerow(
                        {'id': id_count, 'name': item.name.replace('-', ' '), 'price': '%.2f' % item.price, 
                         'img': "IMG", 'category':[]}
                        )
                    id_count += 1
                    print("writing" + item.name.replace('-', ' '))

            f_output.close()
            print("written to csv")
            

            # overwrite json file / write to json
            json_file = 'item_info.json'
            f_csv = open(csv_file, 'r')
            f_output = open(json_file ,'w')

            reader = csv.DictReader( f_csv, header)
            next(reader) # skip header
            out = json.dumps( [ row for row in reader ] )
            # print(out)
            f_output.write(out)
            f_output.close()

            print("written to json")

            break
            
            
            # needs duplicate checking, --> csv and then port to json


if __name__ == "__main__":
    main()
