import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle

# 📌 Load SMS Spam Dataset (you can replace with your own)
# Format: 2 columns -> ['label', 'message']
data = pd.read_csv("https://raw.githubusercontent.com/justmarkham/pycon-2016-tutorial/master/data/sms.tsv",
                   sep="\t", header=None, names=["label", "message"])

# Convert labels: ham → 0, spam → 1
data["label"] = data["label"].map({"ham": 0, "spam": 1})

# Split X (text) and y (labels)
X = data["message"]
y = data["label"]

# Text Vectorization (TF-IDF)
vectorizer = TfidfVectorizer(stop_words="english")
X_vec = vectorizer.fit_transform(X)

# Train Naive Bayes Classifier
model = MultinomialNB()
model.fit(X_vec, y)

# Save model and vectorizer
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))

print("✅ Model trained and saved successfully!")
