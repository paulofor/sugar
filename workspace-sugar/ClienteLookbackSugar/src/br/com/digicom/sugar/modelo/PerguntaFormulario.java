package br.com.digicom.sugar.modelo;

import com.strongloop.android.loopback.Model;

public class PerguntaFormulario extends Model{

	private Integer id;
	private String texto;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		this.texto = texto;
	}
	
	
}
