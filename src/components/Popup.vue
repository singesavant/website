<script>
  export default {
    name: 'Popup',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
  <div class="popup-container">
    <div class="modal-backdrop"></div>
    <div class="modal"
         role="dialog"
         aria-labelledby="modalTitle"
         aria-describedby="modalDescription">
      <section
        class="modal-body"
        id="modalDescription">
        <slot name="body">
          Ce site est interdit aux personnes de moins de 18 ans
        </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer">
          J'ai plus de 18 ans
        </slot>
        <table>
          <tr>
            <th><button type="button" class="btn btn-primary" @click="close">Oui</button></th>
            <th><a href="http://www.google.com"><button type="button" class="btn btn-primary">Non</button></a></th>
          </tr>
        </table>
      </footer>
    </div>
  </div>
</template>

<style scoped>
  .popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    pointer-events: none;
  }

  .modal-backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    opacity: 0.7;
    pointer-events: auto;
    z-index: 1;
  }

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: auto;
    height: auto;
    border-radius: 20px;
    padding: 20px;
    min-width: 300px;
    pointer-events: auto;
    z-index: 2;
  }

  .modal-footer {
    padding: 15px;
    text-align: center;
    display: flex;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }
  .modal-body {
    position: relative;
    text-align : center;
    font-weight : bold;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

</style>
