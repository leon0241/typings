# Words taken from https://www.wordfrequency.info/
# Converts top 1000 words csv into a list of words
# Rank - Name - Frequency - Caps

import pandas as pd

df = pd.read_csv("resources/top1000.csv")
df = df.set_index("Rank")
print(df)
df.loc[df["Caps"] > 0.90, "Word"] = df["Word"].str.capitalize()
arr = df["Word"].tolist()
print(arr)

with open('resources/top1000words.txt', 'w') as f:
    for item in arr:
        f.write("'" + item + "', ")

with open('resources/top200words.txt', 'w') as f:
    for i in range(200):
        f.write("'" + arr[i] + "', ")