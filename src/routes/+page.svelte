<script lang="ts">
    let myInput: string = "";

    function test() {
        alert("test");
    }
</script>

<ion-app>
    <ion-header translucent>
      <ion-toolbar>
          <ion-title>Button</ion-title>
      </ion-toolbar>
     </ion-header>
    <ion-content fullscreen>
        <ion-label>Default Label</ion-label>
        <ion-input placeholder="placeholder" />
        <ion-button on:click={test}>Register</ion-button>
    </ion-content>
</ion-app>
