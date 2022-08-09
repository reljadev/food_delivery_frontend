<template>
<div class="outer">
  <div class="middle">
    <div class="card">
      <img :src="$auth.user.picture" alt="John" style="width:30%">
      <h1 style="margin-top: 20px">{{ $auth.user["https://food.delivery.data.com/full_name"] }}</h1>
      <p class="title">User profile</p>

      <div class="profile_info_container">
        <div class="info_container">
          <div class="info_name_container">Email</div>
          <div class="info_value_container">{{ $auth.user.email }}</div>
        </div>
        <div class="info_container">
          <div class="info_name_container">Address</div>
          <div class="info_value_container">
            {{ $auth.user["https://food.delivery.data.com/address"] }}
          </div>
        </div>
        <div class="info_container">
          <div class="info_name_container">Last updated</div>
          <div class="info_value_container">{{ $auth.user.updated_at }}</div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>

  export default {
    name: 'Profile'
  }

</script>

<style scoped>
.outer {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 2%;
  height: 100%;
  width: 100%;
}

.middle {
  display: table-cell;
  vertical-align: middle;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: fit-content;
  margin: auto;
  text-align: center;
}

.title {
  color: grey;
  font-size: 18px;
}

.profile_info_container {
  margin-bottom: 30px;
}

.info_container {
  width: fit-content;
  margin-left: 10px;
  height: 50px;
}

.info_name_container {
  float: left;
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  background-color: gray;
}

.info_value_container {
  float: right;
  margin-right: 10px;
  width: 330px;
  height: 40px;
  line-height: 40px;
  text-align: left;
  padding-left: 5px;
  border: 2px solid gray;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

</style>