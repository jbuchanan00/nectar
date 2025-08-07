<script lang="ts">
    import { base } from "$app/paths";
    let fileInput: HTMLInputElement | null = null
    let previewImage: string | null = $state(null)
    let {formChange} = $props()

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
                formChange('image', previewImage)
            }
            reader.readAsDataURL(file)
            
        }
    }
</script>

<div>
    <div class="uploadHeading">
        <h2>UPLOAD YOUR PHOTO</h2>
        <h4>Choose an amazing photo to share with the world!</h4>
    </div>
    <div class="addPhoto">
        <input type="file" id="imagePicker" accept=".jpg,.png,.svg,.heic" bind:this={fileInput} onchange={handleImageChange}/>
        
         {#if previewImage}
         <button class="changePhoto" onclick={triggerImageUpload}>
             <img src={previewImage} alt="placeholder" class="postImageExists"/>
         </button>
        {:else}
        <div class="postImage">
            <div class="action" >
                <button class="iconButton" onclick={triggerImageUpload}>
                    <img src={`${base}/icons/upload.svg`} alt="upload" />
                </button>
                <div class="clickToChoose">
                    Click to Choose
                </div>
            </div>
        </div>
        {/if}
    </div>
</div>
<style>
    .changePhoto {
        padding: 0;
        border: none;
        background: none;
    }
    .iconButton:active {
        box-shadow: none;
        transform: translateX(3px) translateY(3px);
    }
    .iconButton {
        background-color: #a855f7;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid black;
        box-shadow: 3px 3px black;
        border-radius: 50%;
    }
    .iconButton img {
        scale: 1.25;
        filter: invert();
    }
    .action {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 150px;
    }
    .addPhoto {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
    .uploadHeading {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        height: 50px;
        margin: 20px 0px 20px 0px;
    }
    .uploadHeading h2 {
        font-size: medium;
        font-weight: bolder;
        letter-spacing: -.1em;
    }
    .uploadHeading h4 {
        font-size: .6em;
        color: #3e4757;
        letter-spacing: -.05em;
    }
    #imagePicker {
        display: none;
    }
    .postImage {
        width: 300px;
        background-color: #a5f3fc;
        border: 5px dashed black;
        aspect-ratio: 9/5;
    }
    .postImageExists {
        width: 300px;
        background-color: white;
        border: 5px dashed black;
        aspect-ratio: 1/1;
        object-fit: contain;
        object-position: center;
        display: block;
        
    }
</style>