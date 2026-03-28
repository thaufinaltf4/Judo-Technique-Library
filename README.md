# Judo-Technique-Library

A website that curates Judo techniques for analysis and review. Demos featured are from the official Kodokan YouTube channel.

---

## Ideation

Alongside being a Computer Engineering student, I'm an avid Judoka. I fell in love with the sport and spend a lot of time outside of practice watching matches and techniques. When I first started researching Judo outside of the dojo, I found that there wasn't really a clear place to start. YouTube content was scattered and it was tough to find consistent demonstrations.

I also wanted a way to increase my Judo IQ, my pattern recognition. As I became a better practitioner, I noticed I was able to identify techniques mid match and it started becoming second nature. This is usually how it goes but how can someone get better at this intentionally?

This is why I decided to create my Judo Library. I could curate consistent technique videos to watch back whenever I wanted, all in one place. Implementing a quiz feature was a logical no-brainer. Anki flashcards, Quizlet, the best memorization tools already test your recollection through spaced repetition.

---

## The Library

When designing the UI for this I wanted the main color scheme to be black, white, and red. White and red are the colors of the **coral belt**, the highest honor a Judoka can receive and black is always used in sleek design. A black and white UI with red accents would also reflect the sharper, sporty feel I was going for.

I wanted the techniques to show up in the library almost like cards, you could click on them and then see the video along with a few tips and instructions to execute on the mat.

I wanted to make sure I was giving proper homage while creating this tool, so I decided to include the kanji for all the moves as well. Shintaro Higashi, one of the biggest Judo YouTubers, mentioned something interesting in a video about memorizing Judo technique names. He mentioned that understanding the Japanese words behind them makes it very easy. For example, Osoto-Gari is a full sweeping throw in which you sweep their leg from the outside after forcing the opponent off balance onto it. Osoto-Gari translates to:

- **Ō (大)** = "major" or "big"
- **Soto (外)** = "outer" or "outside"
- **Gari (刈り)** = "reap"

So it literally means **"Big outside reap"**. I wanted this aspect to be represented in my tool.

---

## The Quiz

I wanted the quiz design to be very simple, the video cuts and plays the specific move, and an empty text box for the user to write out an answer. I didn't want to use multiple choice or assignment type questions because it would promote other methods rather then recognizing the throws themselves. The other major feature is a recognition tracker, the quiz would track which throws you have problems with and question you about those just a bit more.

---

## Live Demo

https://thaufins-judo-library.vercel.app/

---

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- TanStack Query
- React Router

**Backend**
- Python + FastAPI
- PostgreSQL
- SQLAlchemy (async)
- Alembic
- Pydantic

**Deployment**
- Vercel (frontend)
- Railway (backend + database)

---

## Running Locally

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Backend**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend needs a PostgreSQL database. Add a `.env` file inside `/backend` with:
```
DATABASE_URL=postgresql+asyncpg://user:password@localhost/judolibrary
```
