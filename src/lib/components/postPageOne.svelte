<script lang="ts">
    import placeholderImage from '$lib/images/placeholder-picture.png'

    let fileInput: HTMLInputElement | null = null
    let initPreviewImage: string = placeholderImage
    let previewImage = $state(initPreviewImage)
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
    <input type="file" id="imagePicker" accept=".jpg,.png,.svg" bind:this={fileInput} onchange={handleImageChange}/>
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <img src={previewImage} alt="placeholder" onclick={triggerImageUpload} class="postImage"/>
</div>
<style>
    #imagePicker {
        display: none;
    }
    .postImage {
        width: 300px;
        height: 450px;
        border-radius: 10px;
        border: 5px solid black;
    }
</style>