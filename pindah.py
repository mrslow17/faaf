import csv
import os
import datetime

waktu_sekarang = datetime.datetime.now()

def copy_content(source_file, destination_file):
    # Baca isi file asli.txt
    with open(source_file, 'r') as source:
        content = source.read()
    
    # Hapus isi file run.js
    with open(destination_file, 'w') as destination:
        destination.truncate(0)

    # Salin isi file asli.txt ke run.js
    with open(destination_file, 'a') as destination:
        destination.write(content)

# Panggil fungsi untuk menyalin isi file
copy_content('asli.txt', 'run.js')








# Read the CSV file and extract the first 10 lines
with open('wal.csv', 'r') as csv_file:
    csv_reader = csv.reader(csv_file)
    lines = [','.join(row) for idx, row in enumerate(csv_reader) if idx < 100]

# Convert the list of lines into a single string with newline characters separating each line
data_string = '\n'.join(lines)

# Read the content of run.js and replace {data} with data_string
with open('run.js', 'r') as file:
    file_content = file.read()
    updated_content = file_content.replace('{data}', data_string)

# Write the updated content back to run.js
with open('run.js', 'w') as file:
    file.write(updated_content)

# Write the remaining lines back to wal.csv
with open('wal.csv', 'r') as csv_file:
    lines = csv_file.readlines()[100:]  # Get the remaining lines starting from the 11th line

with open('wal.csv', 'w') as csv_file:
    csv_file.writelines(lines)
    
    

def hitung_jumlah_baris(file_csv):
    with open(file_csv, 'r') as file:
        reader = csv.reader(file)
        jumlah_baris = sum(1 for row in reader)
    return jumlah_baris

# Mengganti 'file.csv' dengan 'wal.csv'
nama_file_csv = 'wal.csv'
jumlah_baris = hitung_jumlah_baris(nama_file_csv)
print("BERHASIL DI PINDAH SISA DATANYA :", jumlah_baris,"| WAKTU - ",waktu_sekarang.hour,":",waktu_sekarang.minute)





