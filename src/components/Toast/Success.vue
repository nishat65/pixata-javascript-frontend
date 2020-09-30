<template>
    <div>{{ msg }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        msg: {
            type: String,
            default: 'Success!',
        },
    },
});
</script>
<style lang="scss" scoped></style>
