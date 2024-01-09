


export default function extractUsernameFromEmail( email  :string | null | undefined) {
  if (email) {
    const parts = email.length > 0 ? email.split("@") : '' ;
    return parts[0]
  } else {
    return ''
  }
}