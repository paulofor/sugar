package br.com.digicom.sugar.modelo.extra;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import br.com.digicom.sugar.modelo.RespostaFormulario;

public class BabyArquivo {
	
	private String email;
	private String nome;
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
	public JSONObject getJSON() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("email", email);
			obj.put("nome", nome);
			obj.put("respostas", this.getJSONResposta());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	public JSONArray getJSONResposta() {
		JSONArray saida = new JSONArray();
		for (RespostaFormulario resposta : this.respostas) {
			saida.put(resposta.getJSON());
		}
		return saida;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	

}
