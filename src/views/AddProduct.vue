<template>
    <v-container>
        <v-row class="justify-center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>
                        <h2>Add Art</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" enctype="multipart/form-data" v-model="valid" lazy-validation>
                            <v-file-input
                                v-model="image"
                                label="Choose Image"
                                :rules="[v => !!v || 'Image is required']"
                                prepend-icon="mdi-camera"
                            ></v-file-input>

                            <v-text-field
                                v-model="title"
                                :rules="[v => !!v || 'Title is required']"
                                label="Title"
                                required
                            ></v-text-field>

                            <v-text-field
                                append-icon="mdi-currency-usd"
                                v-model="price"
                                :rules="priceRules"
                                label="Price"
                                type="number"
                                required
                            ></v-text-field>

                            <v-textarea
                                label="Description"
                                v-model="description"
                                :rules="descriptionRules"
                                counter="1000"
                            ></v-textarea>

                            <v-select
                                v-model="categories"
                                :items="this.allCategories"
                                :rules="[v => !!v || 'Item is required']"
                                label="Categories"
                                required
                            ></v-select>

                            <v-btn
                                width="100%"
                                :disabled="!valid"
                                dark
                                class="mr-4"
                                @click="validate"
                            >
                                Add
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data: () => ({
        valid: true,
        image: null,
        title: null,
        price: null,
        description: "",
        categories: null,

        descriptionRules: [
            v => !!v || "Description is required",
            v =>
                (v && v.length <= 1000) ||
                "Description must be 1000 characters or less"
        ],

        priceRules: [
            v => !!v || "Price is required",
            v => v > 0 || "Price should be positive integer"
        ],

    }),
    computed: {
        ...mapGetters("TheCategory", {
            allCategories:'getCategories'
        })
    },

    methods: {
        ...mapActions( 'TheCategory',{
          getAllCategories:'getAllCategoriesNoPagination'
        }),
        ...mapActions( 'TheProduct',{
            createProduct:'createProduct'
        }),
        validate() {
            if (this.$refs.form.validate()) {
                const data = new FormData();
                data.append("image", this.image);
                data.append("title", this.title);
                data.append("price", this.price);
                data.append("description", this.description);
                data.append("categories", this.categories);
                let obj = {
                    'data':data,
                    'title':this.title
                }
                this.createProduct(obj)
            }
        }
    },
    mounted() {
      this.getAllCategories()
    },
};
</script>
