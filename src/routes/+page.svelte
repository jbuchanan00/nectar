<script>
    import { enhance } from '$app/forms';
    import placeholderImage from '$lib/images/placeholder-picture.png'
</script>

<div class="postCreationContainer">
    <div class="creationHeading">
        <h3>New Post</h3>
        <a href="/">X</a>
    </div>
    <form method="POST" use:enhance>
        <img src={placeholderImage} alt="placeholder"/>
    </form>
</div>

<style>
    img {
        width: 95%;
        border-radius: 10px;
        border: 5px solid black;
    }
    .creationHeading {
        width: 100%;
        display: flex;
    }
    .creationHeading h3 {
        text-align: center;
        width: 100%;
        height: 3em;
        padding-top: 10px;
        text-decoration: underline;
    }
    .creationHeading a {
        position: absolute;
        right: 0;
        padding: 10px;
        text-decoration: none;
        color: black;
    }
    .postCreationContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    form {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>