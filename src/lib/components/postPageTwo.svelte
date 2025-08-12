<script lang="ts">

	let newTag = $state('')

    let {formChange, tags} = $props()

    function triggerChange(event: FocusEvent){
        const target = event.target as HTMLInputElement
		formChange(target.name, target.value ?? '')
    }

	function handleTagAdd(){
		formChange('tag', newTag)
		newTag = ''
	}
</script>

<div class="body">
	<div class="heading">
		<div class="title">
			<h2>ADD DETAILS</h2>
		</div>
		<div class="subtitle">
			<h4>Tell your story and add some context!</h4>
		</div>
	</div>
	<div class="input_groups">
		<label for="description">Caption</label>
		<textarea name="description" id="description" placeholder="What's on your mind? Share your story..." rows=5 class="form_style" onblur={triggerChange}></textarea>
	</div>
	<div class="roleRadio">
		<fieldset >
			<legend>Your Role</legend>
			<div class="radios">
				<div class="row">
					<label for="canvas" >
						<input type="radio" id="canvas" name="role" value="0" onblur={triggerChange} />
						Canvas
					</label>
				</div>
				<div class="row">
					<label for="artist">
						<input type="radio" id="artist" name="role" value="1" onblur={triggerChange} />
						Artist
					</label>
				</div>
				<div class="row">
					<label for="share">
						<input type="radio" id="share" name="role" value="2" checked onblur={triggerChange}/>
						Sharing
					</label>
				</div>
			</div>
		</fieldset>
	</div>
	<div class="input_groups">
		<label for="tags">Tags</label>
		<div class="taggingAdding">
			<div class="form_group">
				<input name="tags" type="text" id="title" placeholder="Add post tags" class="form_style" bind:value={newTag}/>
			</div>
			<div class="addingTag">
				<button type='button' class="addTagButton" onclick={handleTagAdd}>ADD</button>
			</div>
			
		</div>
		<div class="tagList">
			{#each tags as tag}
			<div class="tag">
				<p>#{tag}</p>
			</div>
			{/each}
		</div>
		
	</div>
</div>

<style>
	input[type="radio"]{
		color: black;
		box-shadow: none;
		margin: 10px;
		appearance: none;

		border-radius: 50%;
		width: 16px;
		height: 16px;

		border: 3px solid black;
		transition: 0.2s all linear;
	}
	input[type="radio"]:checked {
		background-color: black;
	}
	.row label{
		display: flex;
		align-items: center;
		border: 3px solid #000;
		height: 50px;
		box-shadow: 3px 3px black;
		margin-bottom: 10px;
	}
	.row:active {
		box-shadow: none;
		transform: translateX(3px) translateY(3px);
	}
	.roleRadio fieldset {
		border: none;
	}
	.roleRadio {
		width: 90%;
	}
	.title {
		font-size: .75em;
		font-weight: bolder;
		letter-spacing: -.2em;
		height: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.subtitle {
		font-size: .75em;
		height: 50%;
		color: #4b5563;
	}
	.heading {
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.tag {
		font-size: .6em;
		margin: 5px;
		padding: 3px;
		border: 2px solid black;
		box-shadow: 2px 2px black;
		background-color: #fde047;
		font-weight: bolder;
	}
	.tagList {
		flex-wrap: wrap;
		display: flex;

	}
	#description {
		margin-top: 7px;
	}
	.form_group {
		width: 100%;
	}
	.addTagButton {
		width: 100%;
		height: 100%;
		background-color: #3b82f6;
		color: white;
		border: 3px solid black;
		box-shadow: 3px 3px black;
		font-weight: bolder;
		font-size: small;
	}
	.addingTag {
		width: 25%;
		height: 50px;
		margin: 7px;
	}
	.taggingAdding {
		display: flex;
		align-items: center;
		width: 100%;
	}
	.input_groups {
		width: 90%;
		margin-bottom: 20px;
	}
	.body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
    .form_style {
		width: 100%;
		padding: 12px 10px;
		font-size: 15px
    }
    textarea, input {
        resize: none;
		border: 3px solid black;
		box-shadow: 3px 3px black;
		color: #4b5563;
		font-weight: bolder;
    }
</style>