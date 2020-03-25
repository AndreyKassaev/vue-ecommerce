<template>
    <v-card class="mx-auto " elevation="24">
        <v-card-title>
            My Art Collection:
        </v-card-title>
        <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left title font-weight-bold">
                                Image
                            </th>
                            <th class="text-left title font-weight-bold">
                                Title
                            </th>
                            <th class="text-left title font-weight-bold">
                                Price
                            </th>
                            <th class="text-left title font-weight-bold">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items" :key="index" >
                            <td @click="onItem(item.title)">
                                <v-avatar>
                                    <img
                                        :src="item.image"
                                        alt="Art"
                                    />
                                </v-avatar>
                            </td>

                            <td @click="onItem(item.title)">
                                {{ item.title }}
                            </td>

                            <td>{{ item.price }} $</td>
                            <td @click="onEditIcon(item.title)">
                            <v-icon>
                            mdi-border-color
                            </v-icon>
                            </td>
                        </tr>
                        <tr></tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
    props: ["items"],
    methods: {
        onItem(title){
            this.$router.push({name:'Product Details', params:{product_title: title}})
        },
        onEditIcon(title){
            this.$router.push({name:'Edit Art', params:{title: title}})
        }
    },
    data() {
        return {};
    }
};
</script>
<style scoped>
td:hover {
    cursor: pointer;
}

</style>
