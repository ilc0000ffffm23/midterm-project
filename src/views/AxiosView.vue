<template>
  <v-container fluid class="">
    <h1 class="text-center font-weight-bold text-h1 mt-16 mb-10 text-blue-grey-darken-3">
      Easy Peasy Lemon sQUIZzy
    </h1>
    <v-card color="#FFEFBA" class="border-rounded mx-auto" style="width: 600px">
      <v-container>
        <div class="float-right">
          <v-card-text class="text-h6 font-weight-bold float-right text-green-lighten-1">
            Correct answers: {{ score }}</v-card-text>
        </div>
      </v-container>
      <br />
      <v-form>
        <v-container>
          <v-card-text class="text-h5 font-weight-bold text-center text-indigo-accent-1">Question {{
          currentNumberQuestion }} of
            {{ questions.length }}</v-card-text>
          <v-card-text class="text-h6" v-html="loading ? '' : currentQuestion.question"></v-card-text>
          <form v-if="currentQuestion">
            <v-container>
              <button class="button" v-for="answer in currentQuestion.answers" :index="currentQuestion.key"
                :key="answer" v-html="answer" @click.prevent="handleButtonClick"></button>
            </v-container>
            <button class="reload text-white me-3" @click="reloadPage">Reset the Quiz</button>
          </form>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>
    
<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

export default {
  methods: {
    reloadPage() {
      window.location.reload();
    }
  },
  data() {
    return {
      questions: [],
      loading: true,
      index: 0,
      score: 0,
      currentNumberQuestion: 1,
      auth: getAuth(),
      // userRef: doc(getFirestore(), "users", "yBK7oaWDUGh9Pclf6rcq"),
    };
  },
  computed: {
    currentQuestion() {
      if (this.questions !== []) {
        return this.questions[this.index];
      }
      return null;
    },
  },

  methods: {
    async fetchQuestions() {
      let response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=15&type=multiple"
      );
      let jsonResponse = await response.json();
      let index = 0;
      let data = jsonResponse.results.map((question) => {
        question.answers = [
          question.correct_answer,
          ...question.incorrect_answers,
        ];

        for (let i = question.answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.answers[i], question.answers[j]] = [
            question.answers[j],
            question.answers[i],
          ];
        }

        question.rightAnswer = null;
        question.key = index;
        index++;
        return question;
      });
      this.questions = data;
      this.loading = false;
    },
    handleButtonClick: function (event) {
      let index = event.target.getAttribute("index");

      let pollutedUserAnswer = event.target.innerHTML;

      let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");

      this.questions[index].userAnswer = userAnswer;

      event.target.classList.add("clicked");
      let allButtons = document.querySelectorAll(`[index="${index}"]`);

      for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i] === event.target) continue;

        allButtons[i].setAttribute("disabled", "");
      }

      this.checkAnswer(event, index);
    },
    checkAnswer: function (event, index) {
      let question = this.questions[index];

      if (question.userAnswer) {
        if (this.index < this.questions.length - 1) {
          setTimeout(
            function () {
              this.index += 1;
              this.currentNumberQuestion += 1;
            }.bind(this),
            2000
          );
        }
        if (question.userAnswer === question.correct_answer) {
          event.target.classList.add("rightAnswer");
          this.questions[index].rightAnswer = true;
          this.score++;
          // setDoc(this.userRef, { score: this.score }, { merge: true });
          setDoc(doc(getFirestore(), "users", this.auth.currentUser.email), { score: this.score }, { merge: true });
          // console.log(this.auth.currentUser.email);

        } else {
          // setDoc(this.userRef, { score: this.score }, { merge: true });
          setDoc(doc(getFirestore(), "users", this.auth.currentUser.email), { score: this.score }, { merge: true });
          // console.log(this.auth.currentUser.email);


          event.target.classList.add("wrongAnswer");
          this.questions[index].rightAnswer = false;
          let correctAnswer = this.questions[index].correct_answer;
          let allButtons = document.querySelectorAll(`[index="${index}"]`);
          allButtons.forEach(function (button) {
            if (button.innerHTML === correctAnswer) {
              button.classList.add("showRightAnswer");
            }
          });
        }
      }
    },
  },
  mounted() {
    this.fetchQuestions();
  },
  
};


</script>
    
<style scoped>
.reload {
  background-color: #76b852;
}

button {
  display: block;
  padding: 12px 100px 12px 100px;
  width: 100%;
  margin-bottom: 10px;
  background-color: #b0bec5;
  border-radius: 0.4rem;
  letter-spacing: 1px;
  font-size: 14px;
}

button:hover {
  transform: scale(1.01);
  transition: all 0.25s;
  background-color: #546e7a;
  color: #f7f7f7;
}

button.wrongAnswer {
  color: #fff;
  background-color: #db4e4e;
  font-weight: bold;
}

button.showRightAnswer {
  color: white;
  background-color: #80cbc4;
  font-weight: bold;
}
</style>
