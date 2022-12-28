package br.com.digicom.sugar.processamento;

import java.util.List;

import br.com.digicom.sugar.modelo.RespostaFormulario;

public class BabyArquivo {
	
	private String email;
	private List<RespostaFormulario> respostas;
	
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<RespostaFormulario> getRespostas() {
		return respostas;
	}
	public void setRespostas(List<RespostaFormulario> respostas) {
		this.respostas = respostas;
	}
	
	

}
