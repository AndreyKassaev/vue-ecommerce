<template>
    <v-container>
        <h1>Edit Art:</h1>
        <v-sheet
            tag="div"
            class="row ml-0 mr-0"
            elevation="6"
            width="100%"
            v-if="!!this.product"
        >
            <v-col cols="12" sm="6">
                <v-img class="bg" contain :src="this.product.image"></v-img>
            </v-col>

            <v-col cols="12" sm="6">
                <p class="mb-2 font-weight-bold title">
                    {{ this.product.title }}
                </p>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                        v-model="price"
                        :rules="priceRules"
                        label="Price"
                        type="number"
                        prefix="$"
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="description"
                        :rules="descriptionRules"
                        label="Description"
                        counter="1000"
                    ></v-textarea>

                    <v-btn
                        width="100%"
                        :disabled="!valid"
                        dark
                        class="mr-4"
                        @click="validate"
                    >
                        Edit
                    </v-btn>
                </v-form>
            </v-col>
        </v-sheet>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data: () => ({
        valid: true,
        description: null,
        price: null,
        priceRules: [
            v => !!v || "Price is required",
            v => v > 0 || "Price should be positive integer"
        ],
        descriptionRules: [
            v => !!v || "Description is required",
            v =>
                (v && v.length <= 1000) ||
                "Description must be 1000 characters or less"
        ]
    }),
    mounted() {},
    created() {
        this.getSingleProduct(this.$route.params.title);
    },
    watch: {
        product(newVal, oldVal) {
            if (newVal != oldVal || newVal === null) {
                this.initData();
            }
        }
    },
    computed: {
        ...mapGetters("TheProduct", {
            product: "getSingleProduct"
        })
    },
    methods: {
        ...mapActions("TheProduct", {
            getSingleProduct: "getSingleProduct",
            editArt: "editArt"
        }),
        initData() {
            this.price = this.product.price;
            this.description = this.product.description;
        },
        validate() {
            if (this.$refs.form.validate()) {
                let formData = {
                    price: this.price,
                    description: this.description,
                    id: this.product.id
                };
                this.editArt(formData);
            }
        }
    }
};
</script>
<style></style>
