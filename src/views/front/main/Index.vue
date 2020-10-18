<template>
    <div>
        <vHead></vHead>
        <transition name="move" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import vHead from "./components/MainHeader";
    export default {
        name: "index",
        components:{
            vHead
        }
    }
</script>

<style scoped lang="scss">
.test{
}
</style>
