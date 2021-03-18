<template>
<!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Full Stack Message Board</a>
    </nav>

    <button @click="showMessageForm = !showMessageForm" type="button" class="btn btn-outline-danger
    distance mt-3">Toggle Message Form</button>

    <form v-if="showMessageForm" class="distance" @submit.prevent="addMessage">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="message.username" type="text" class="form-control" id="username"
        required>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input v-model="message.subject" type="text" class="form-control" id="subject"
        placeholder="Subject"
        required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <input v-model="message.message" type="text" class="form-control" id="message"
        placeholder="Message"
        required>
      </div>
      <div class="form-group">
        <label for="imageURL">Image URL</label>
        <input v-model="message.imageURL" type="url" class="form-control" id="imageURL"
         placeholder="Add an imageURL">
      </div>
      <button  type="submit" class="btn btn-outline-success">Share</button>
    </form>

    <div class="distance" v-for="message in reverseMessages" :key="message.id"> <br> <hr>
      <ul class="list-unstyled">
        <li class="media" >
          <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject">
          <div class="media-body">
            <h4 class="mt-0 mb-1"> {{message.username}} </h4>
            <h5 class="mt-0 mb-1"> {{message.subject}} </h5>
            {{message.message}}
            <br>
            <small> {{message.created}} </small>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const API_URL = 'http://localhost:1234/messages';

export default {
  name: 'App',
  data() {
    return {
      messages : [],
      message : {
        username : 'Anonymous',
        subject : '',
        message: '',
        imageURL: '',
      },
      showMessageForm : false,
    }
  },
  mounted() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((result) => {
        this.messages = result;
      });
  },
  methods : {
    addMessage() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json'
        }
      }).then((res) => res.json())
      .then((result) => {
        this.messages.push(result);
      });
    },
  },
  computed: {
    reverseMessages() {
      return this.messages.slice().reverse();
    }
  }
};
</script>

<style>
.distance {
  margin: 10px;
}
hr {
  border-top: 1px solid grey;
}
img {
  max-width: 200px;
  height: auto;
}
</style>
