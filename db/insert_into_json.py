
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
        print("add [1] | delete [2] | view [3] | remove csv duplicates [4] | exit [5]")
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
            csv_file_path = 'item_info.csv'
            column_index = 0
            unique_names = set()

            with open(csv_file_path, 'r', newline='') as file:
                reader = csv.reader(file)
                data = list(reader)
                print(data)
                # Iterate through the rows and update the set of unique names
                new_data = [] 
                for row in data:
                    name = row[column_index]
                    if name not in unique_names:
                        new_data.append(row)
                        unique_names.add(name)
                
                print("removed " + str(unique_names) + "\n")

            # Save the updated data to a new CSV file or overwrite the existing one
            with open('item_info.csv', 'w', newline='') as file:
                writer = csv.writer(file)
                writer.writerows(new_data)
                
        else:
            # write to csv and convert that to json
            csv_file = 'item_info.csv'
            header = ["name", "price"]
            if not os.path.exists(csv_file):
                f_output = open(csv_file ,'w')
                writer = csv.DictWriter(f_output, fieldnames=header)
                writer.writeheader()
            else:
                f_output = open(csv_file ,'a')
                writer = csv.DictWriter(f_output, fieldnames=header)

            for elem in mega_list:
                item = mega_list[elem]
                writer.writerow({'name':item.name.replace('-', ' '), 'price': '%.2f' % item.price})

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
