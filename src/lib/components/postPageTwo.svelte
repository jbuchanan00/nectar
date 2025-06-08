<script lang="ts">
    import {artist, canvas, heartEyes} from '$lib/assets/icons'

    let {formChange} = $props()

    function triggerChange(event: FocusEvent){
        const target = event.target as HTMLInputElement
        target.value ? formChange(target.name, target.value) : null
    }
</script>

<div class="form_group">
        <label for="title">Title</label>
        <input name="title" type="text" id="title" placeholder="Enter post title" onblur={triggerChange} class="form_style"/>
    </div>
    <div class="form_group">
        <label for="description">Description</label>
        <textarea name="description" id="description" placeholder="Enter description for post" rows=5 class="form_style" onblur={triggerChange}></textarea>
    </div>
    <div id="options" class="form_group">
        <fieldset onblur={triggerChange}>
            <legend class="sub_title">What was your role</legend>
            <input type="radio" name="radio" value="Canvas" id="canvas" defaultChecked/>
            <label for="canvas"><img src={canvas} alt="canvas" /><span>Canvas</span></label>
            <input type="radio" name="radio" value="Artist" id="artist"/>
            <label for="artist"><img src={artist} alt="artist" /><span>Artist</span></label>
            <input type="radio" name="radio" value="Neither" id="neither"/>
            <label for="neither"><img src={heartEyes} alt="interested" /><span>Inspired</span></label>
        </fieldset>
</div>

<style>
    .form_style {
        outline: none;
		border: 2px solid #264143;
		box-shadow: 3px 4px 0px 1px #e99f4c;
		width: 290px;
		padding: 12px 10px;
		border-radius: 4px;
		font-size: 15px
    }
    textarea {
        resize: none;
    }
    .sub_title {
		font-weight: 600;
		margin: 5px 0;
	}
    fieldset {
        width: 100%;
    }
    fieldset img {
        width: 100%;
        padding: 5px;
    }
    input, textarea {
		background-color: #DAF5F0;
	}
	input[type="radio"] {
		opacity:0;
		position: absolute;
	}
	input[type="radio"]:checked + label {
		background-color: #e99f4c;
	}
	fieldset label:nth-child(3) {
		border-radius: 5px 0px 0px 5px;
        border-right: none;
	}
	fieldset label:nth-child(7) {
		border-radius: 0px 5px 5px 0px;
        border-left: none;
	}
	fieldset label {
		z-index: 2;
		display: flex;
        flex-direction: column;
		width: 34%;
		height: 125px;
		cursor: pointer;
		border: 2px solid #000;
		background-color: #eddcd9;
        font-size: .75em;
        font-weight: bold;
        text-align: center;
	}
	fieldset label:active {
		transform: translateY(1px);
	}
	#options fieldset{
		display: flex;
		position: relative;
		width: 100%;
		border-radius: 10px;
        border: none;
	}
	#options fieldset::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%; /* Only cover the bottom half */
		border-radius: 10px;
		box-shadow: 5px 5px #e99f4c;
		z-index: 0;
	}
    #options{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
    .form_group {
        margin: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>