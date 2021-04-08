// $(document).ready(() => {});

function validate() {

  if( document.myForm.listingtitle.value == "" ) {
      alert( "Please provide a title." );
      document.myForm.listingtitle.focus() ;
      return false;
  }
  if( document.myForm.image.value == "" ) {
      alert( "Please an image URL." );
      document.myForm.image.focus() ;
      return false;
  }
  if( isNaN( document.myForm.price.value ) || document.myForm.price.value == "") {

      alert( "Please tell us the price using numerals." );
      document.myForm.price.focus() ;
      return false;
  }

  if( isNaN( document.myForm.year.value)) {
    alert( "Please tell us the year using numerals." );
    document.myForm.year.focus() ;
    return false;
  }

  console.log("PREFIX ******************************", document.myForm.featured.value);
  if( document.myForm.featured.value == "") {
    alert( "Please tell us if you want this listing featured or not." );
    // document.myForm.featured.focus() ;
    return false;
  }

  return( true );
}
