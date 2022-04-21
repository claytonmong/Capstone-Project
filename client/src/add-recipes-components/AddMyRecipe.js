import { useState } from 'react'

const AddMyRecipe = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!title) {
      alert('Recipe title can\'t be blank')
      return
    }

    onAdd({ title, ingredients, instructions })

    setTitle('')
    setIngredients('')
    setInstructions('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Recipe Title (*required)</label>
        <input
          type='text'
          placeholder='Add Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Ingredients</label>
        <input
          type='text'
          placeholder='Add Ingredients'
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Instructions</label>
        <input
          type='text'
          placeholder='Add Instructions'
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>

      <input type='submit' value='Save Recipe' className='btn btn-block' />
    </form>
  )
}

export default AddMyRecipe