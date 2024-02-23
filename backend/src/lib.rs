use std::{error::Error, fs};
use pwhash::bcrypt;

pub fn change_password(old_password: &str, new_password: &str) -> Result<(), Box<dyn Error>> {
    if !login(old_password)? {
        return Err(Box::new(
            std::io::Error::new(
                std::io::ErrorKind::InvalidInput, "Old password does not match"
            )
        ))
    }
    
    let hash = bcrypt::hash(new_password)?;
    let _ = fs::write("password.txt", hash)?;
    Ok(())
}

pub fn login(password: &str) -> Result<bool, Box<dyn Error>> {
    let hash = fs::read_to_string("password.txt")?;
    Ok(bcrypt::verify(password, &hash))
}