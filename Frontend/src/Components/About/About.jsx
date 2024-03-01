function About() {

  return (
    <>
      <div className="bg-red-600 min-h-screen">
        <div className="container mx-auto py-12">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">About Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1501139083538-0139583c060f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fFF1aXolMjB3ZWJzaXRlfGVufDB8fDB8fHww" />
            </div>

            <div>
              <p className="text-lg leading-relaxed text-white">
                Welcome to our Quiz website! We are passionate about bringing fun and knowledge together through an assortment of quizzes covering various topics.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white">
                Our team comprises dedicated quiz enthusiasts and experts who curate engaging and informative quizzes for all ages and interests.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">Our Mission</h2>
            <p className="text-lg leading-relaxed text-white text-center">
              Our mission is to entertain, educate, and challenge our users through a diverse range of quizzes, fostering learning and enjoyment simultaneously.
            </p>
            <div className="flex items-center justify-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlV2zEs5Ufuph_ndZycpBaStBNOxJDOdG5EA&usqp=CAU" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About

