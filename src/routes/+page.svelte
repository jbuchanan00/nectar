<script lang="ts">
    import { enhance } from '$app/forms';
    import placeholderImage from '$lib/images/placeholder-picture.png'
    import nextIcon from '$lib/assets/icons/next.svg'
    import {artist, canvas, heartEyes} from '$lib/assets/icons'

    let fileInput: HTMLInputElement | null = null
    let initPageNum: number | null = 1
    let initPreviewImage: string = placeholderImage

    let pageNum = $state(initPageNum)
    let previewImage = $state(initPreviewImage)

    function triggerImageUpload(){
        fileInput?.click()
    }

    function handleImageChange(event: Event){
        const target = event.target as HTMLInputElement
        const file = target.files?.[0]
        if(file){
            const reader = new FileReader()
            reader.onload = () => {
                previewImage = reader.result as string
            }
            reader.readAsDataURL(file)
        }
    }

    function handleNext(){
        pageNum += 1
    }
</script>

<div class="postCreationContainer">
    <div class="creationHeading">
        <h3>New Post</h3>
        <a href="/">X</a>
    </div>
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <form method="POST" use:enhance action="?/upload">
        <div class:pageOne={pageNum === 1} class:pageOneHide={pageNum !== 1}>
            <input type="file" id="imagePicker" accept=".jpg,.png,.svg" bind:this={fileInput} onchange={handleImageChange}/>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <img src={previewImage} alt="placeholder" onclick={triggerImageUpload} class="postImage"/>
            <div class="ontoNext">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                Next <img src={nextIcon} alt="next" class="nextImage" onclick={handleNext}/>
            </div>
        </div>
        <div class:pageTwo={pageNum === 2} class:pageTwoHide={pageNum !== 2}>
            <label for="title">Title</label>
            <input name="title" type="text" id="title" placeholder="Enter post title" />
            <label for="description">Description</label>
            <textarea name="description" id="description" placeholder="Enter description for post"></textarea>
            <fieldset>
                <legend>What was your role</legend>
                <label><input type="radio" name="radio" value="Canvas" defaultChecked/><img src={canvas} alt="canvas" /></label>
                <label><input type="radio" name="radio" value="Artist"/><img src={artist} alt="artist" /></label>
                <label><input type="radio" name="radio" value="Neither"/><img src={heartEyes} alt="interested" /></label>
            </fieldset>
        </div>
    </form>
</div>

<style>
    #imagePicker {
        display: none;
    }
    fieldset {
        width: 100%;
    }
    fieldset img {
        width: 25%;
    }
    .ontoNext {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: end;
        padding-right: 10px;
    }
    .nextImage {
        height: 25px;
        border: none;
        margin-left: 10px;
    }
    .postImage {
        width: 300px;
        height: 450px;
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
    .pageOne {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .pageOneHide {
        display: none;
    }
    .pageTwo {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .pageTwoHide {
        display: none;
    }
</style>