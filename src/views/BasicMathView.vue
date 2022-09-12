<template>

  <v-container fluid>
    <v-card class="mx-auto" color="#BDBDBD" style="width:600px">
      <center>
      <v-card-title>Basic Math Calculator</v-card-title>
      </center>
      <v-divider></v-divider>
      <v-container>
        <v-text-field label="First Input" v-model.number="f_number"></v-text-field>
        <v-text-field label="Second Input" v-model.number="s_number"></v-text-field>

        <v-btn @click="doCompute">Result</v-btn>
        <br>
        <br>
        Sum: {{ sum }} <br>
        Difference: {{ difference }} <br>
        Product: {{ product }} <br>
        Quotient: {{ quotient }} <br>
        Average: {{ average }} <br>
      </v-container>
    </v-card>


  </v-container>
</template>

<script setup>
import { ref } from 'vue'
const f_number = ref()
const s_number = ref()
const sum = ref(0)
const difference = ref(0)
const product = ref(0)
const quotient = ref(0)
const average = ref(0)

function doCompute() {
  sum.value = f_number.value + s_number.value
  difference.value = f_number.value - s_number.value
  product.value = f_number.value * s_number.value
  quotient.value = f_number.value / s_number.value
  average.value = (f_number.value + s_number.value) / 2
  return sum.value, difference.value, product.value, quotient.value, average.value
}
</script>


