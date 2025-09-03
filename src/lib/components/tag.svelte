<script lang="ts">
    let {tagText} = $props();
    console.log(tagText)
</script>

<div class="tag">
    #{tagText}
</div>

<style>
    .tag {
        font-size: .6em;
        padding: 3px;
        border: 2px solid black;
        box-shadow: 2px 2px black;
        background-color: #fde047;
        font-weight: bolder;
	}
</style>