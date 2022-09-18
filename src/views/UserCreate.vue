<template>
    <v-container fluid>
        <v-card class="mx-auto" color="#BDBDBD" style="width:600px">
            <div class="card card-body mt-4">
                <form @submit.prevent="onSubmit" style="margin: 25px">
                    <div class="form-group">
                        <label>Name</label>
                        <input v-model="form.name" class="form-control" required style="background-color: #72A4D2"/>
                    </div>

                    <div class="form-group mt-3">
                        <label>Email</label>
                        <input v-model="form.email" class="form-control" type="email" required style="background-color: #72A4D2"/>
                    </div>

                    <button type="submit" class="btn btn-success mt-3" style="background-color: white">
                        Create User
                    </button>
                </form>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import { createUser } from '/firebase'
import { reactive } from 'vue'
export default {
    setup() {
        const form = reactive({ name: '', email: '' })
        const onSubmit = async () => {
            await createUser({ ...form })
            form.name = ''
            form.email = ''
        }
        return { form, onSubmit }
    }
}
</script>