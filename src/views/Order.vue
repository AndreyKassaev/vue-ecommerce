<template>
    <v-container>
        <v-row align="center"
        justify="center">
        <v-col  cols="12" md="6" v-if="isLoading">
        <div class="text-center ma-12">
         <v-progress-circular
        :indeterminate="indeterminate"
        :rotate="rotate"
        :size="size"
        :value="value"
        :width="width"
        color="orange"
      >loading</v-progress-circular>
        </div>
        </v-col>
            <v-col cols="12" md="8" v-else>
                <v-card
                    class="mx-auto"
                >
                    <v-card-title>
                        <h2>
                        Create Order
                        </h2>
                    </v-card-title>

                    <v-card-text>

                    <p>Card ID: 1234 with total: 12342</p>

                    <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    >

                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>
                    
                      <v-text-field
                    v-model="country"
                    :rules="locationRules"
                    label="Country"
                    required
                    ></v-text-field>
                    
                      <v-text-field
                    v-model="city"
                    :rules="locationRules"
                    label="City"
                    required
                    ></v-text-field>
                    
                      <v-text-field
                    v-model="street"
                    :rules="locationRules"
                    label="Street"
                    required
                    ></v-text-field>
                    <v-row>
                        <v-col cols='6'>
                             <v-text-field
                    v-model="building"
                    :rules="locationIntRules"
                    label="Building"
                    required
                    ></v-text-field>
                    
                        </v-col>
                        <v-col cols='6'>
                         <v-text-field
                    v-model="apartment"
                    :rules="locationIntRules"
                    label="Apartment"
                    required
                    ></v-text-field>
                        </v-col>
                    </v-row>
                    
                    </v-form>
                </v-card-text>
                <v-card-actions class="pa-0">
                    <v-btn color="orange" width="100%" :disabled="!valid" @click="validate">
                        Choose Payment Methods
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-container>


  
  
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

  export default {
  
    data: function(){
        return {
            indeterminate: true,
            rotate: 0,
            size: 100,
            value: 100,
            width: 20,
            isLoading: false,
            valid: true,
            email: 'multarospo@enayu.com',
            country:'testCountry',
            city: 'testCity',
            street: 'testStreet',
            building: 12,
            apartment:22,
            
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            locationRules: [
                v => !!v || 'Location is required'
            ],
            locationIntRules: [
                v => !!v || 'Location is required',
                v => v > 0 || 'Should be positive number'
            ],

        }
    },
 
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
            let data = {
                email:this.email,
                country:this.country,
                city:this.city,
                street:this.street,
                building:this.building,
                apartment:this.apartment
            }
            this.isLoading = true
            this.createOrderAction(data)
        }
      },
      ...mapActions('TheOrder',{
          createOrderAction:'createOrder'
      })
    },
  }
</script>

<style>

</style>