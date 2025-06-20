package br.com.digicom.sugar.modelo.extra;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import br.com.digicom.sugar.modelo.RespostaFormulario;

public class BabyArquivo {
	
	private String email;
	private String nomeApelido;
	private List<RespostaFormulario> respostas;
	private String altura;
	private String peso;
	private String quadril;
	private String dataNascimento;
	private String rendaMensal;
	
	
	
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
	public String getQuadril() {
		return quadril;
	}
	public void setQuadril(String quadril) {
		this.quadril = quadril;
	}
	public String getDataNascimento() {
		return dataNascimento;
	}
	public void setDataNascimento(String dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
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
			obj.put("nomeApelido", nomeApelido);
			obj.put("altura", altura);
			obj.put("peso", peso);
			obj.put("quadril", quadril);
			obj.put("dataNascimento", dataNascimento);
			obj.put("rendaMensal", rendaMensal);
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
	public String getNomeApelido() {
		return nomeApelido;
	}
	public void setNomeApelido(String nomeApelido) {
		this.nomeApelido = nomeApelido;
	}
	public String getRendaMensal() {
		return rendaMensal;
	}
	public void setRendaMensal(String rendaMensal) {
		this.rendaMensal = rendaMensal;
	}
	
	

}
