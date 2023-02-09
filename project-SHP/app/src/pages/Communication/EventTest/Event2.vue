<template>
  <div style="background: #ccc; height: 80px;">
    <h2>Event2组件</h2>
    <button @click="$emit('click','自定义事件click')">分发自定义click事件</button><br>
    <button @click="$emit('xxx','我是自定义事件xxx')">分发自定义xxx事件</button><br>
    <button @click="$emit('zzz' , '欧斯我的超人')">分发自定义zzz事件</button>
  </div>
</template>
