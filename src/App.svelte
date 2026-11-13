<script>
  let labelObj = $state({ label: "hello world", count: 0 });
  const onIncrementCount = () => (labelObj.count = labelObj.count + 1);
  const onChangeLabel = () => (labelObj.label = "label changed");
</script>

<button onclick={onChangeLabel}>
  change label {labelObj.label}
</button>
<button onclick={onIncrementCount}>
  change count
  {labelObj.count}
</button>
<h1>Hello world</h1>

<style>
  button {
    background-color: red;
  }
  h1 {
    background-color: green;
  }
</style>
