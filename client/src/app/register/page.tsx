'use client'

export default function Register() {
  const handleClick = () => {
    console.log('Register')
  }

  return (
    <div>
      <button
        onClick={() => {
          handleClick()
        }}
      >
        Console log
      </button>
    </div>
  )
}
