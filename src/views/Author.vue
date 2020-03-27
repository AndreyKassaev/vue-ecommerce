<template>
    <v-container>
        <v-row class="justify-center">
            <v-col cols="12" md="6" sm="8">
                <v-card>
                    <v-card-title>
                        <h2>
                            Become An Author
                        </h2>
                    </v-card-title>

                    <v-card-text>
                        <v-form
                            enctype="multipart/form-data"
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-file-input
                                label="Avatar"
                                filled
                                v-model="image"
                                prepend-icon="mdi-camera"
                                :rules="imgRules"
                                accept="image/*"
                            ></v-file-input>

                            <v-text-field
                                v-model="name"
                                :rules="nameRules"
                                label="Name"
                                required
                            ></v-text-field>

                            <v-textarea
                                name="bio"
                                label="Bio"
                                :counter="1000"
                                v-model="bio"
                                :rules="bioRules"
                                required
                            ></v-textarea>

                            <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mr-4"
                                @click="validate"
                                block
                                
                            >
                                Become An Author
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data: function() {
        return {
            valid: true,
            image: null,
            name: "",
            bio: "",
            nameRules: [v => !!v || "Name is required"],
            bioRules: [
                v => !!v || "Bio is required",
                v => !!(v.length < 1000) || "1000 characters maximum"
            ],
            imgRules: [v => !!v || "Image is required"]
        };
    },

    methods: {
        ...mapActions("TheAuthor", {
            becomeAnAuthor: "becomeAnAuthor"
        }),
        validate() {
            if (this.$refs.form.validate()) {
                const formData = new FormData();
                formData.append("image", this.image);
                formData.append("name", this.name);
                formData.append("bio", this.bio);

                let complexData = {
                    dataToPost: formData,
                    name: this.name
                }
                
                this.becomeAnAuthor(complexData);
            }
        }
    }
};
</script>
