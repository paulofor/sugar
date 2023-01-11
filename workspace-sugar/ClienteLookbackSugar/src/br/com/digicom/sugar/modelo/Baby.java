package br.com.digicom.sugar.modelo;

import com.strongloop.android.loopback.Model;

public class Baby extends Model {
	
	private String email;
	private String nomeApelido;
	private String altura;
	private String peso;

	
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNomeApelido() {
		return nomeApelido;
	}
	public void setNomeApelido(String nomeApelido) {
		this.nomeApelido = nomeApelido;
	}
	public String getAltura() {
		return altura;
	}
	public void setAltura(String altura) {
		this.altura = altura;
	}
	public String getPeso() {
		return peso;
	}
	public void setPeso(String peso) {
		this.peso = peso;
	}
	
	
	
	

}
