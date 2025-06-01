<script>
    import { enhance } from '$app/forms';
    import placeholderImage from '$lib/images/placeholder-picture.png'
</script>

<div>
    <h3>New Post</h3>
    <a href="/">X</a>
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
</style>