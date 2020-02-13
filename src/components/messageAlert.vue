<template>
    <div>
        <b-alert v-for="alert in alertList" :variant="alert.variant" :key="alert.id" :show="alertLen">{{ alert.value }}</b-alert>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data(){
        return {
        }
    },
    computed: {
        ...mapState(['alertList']),
        alertLen() {
            return this.alertList.length;
        }
    }
    
}
</script>