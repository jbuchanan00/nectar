<script>
    import Post from "./post.svelte";
    let {formData} = $props()

</script>

<div class="modalContainer">
    <div class="previewHeading">
        <div class="title">
            <h2>PREVIEW YOUR POST</h2>
        </div>
        <div class="subtitle">
            <h5>Take a final look before sharing!</h5>
        </div>
    </div>
    <div class="post">
        <Post {formData}/>
    </div>
</div>

<style>
    .title {
        letter-spacing: -.2em;
        font-size: .9em;
        font-weight: bolder;
    }
    .title, .subtitle {
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .subtitle {
        color: #4b5563;
        letter-spacing: -.1em;
        align-items: start;
    }
    .previewHeading {
        height: 75px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .post {
        display: flex;
        justify-content: center;
    }
    .modalContainer {
        display: flex;
        flex-direction: column;
    }

</style>