package br.com.gersis.loopback.modelo;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.strongloop.android.loopback.Model;
import com.strongloop.android.remoting.BeanUtil;
import org.json.JSONObject;


public class PerguntaFormulario extends Model {


	private String texto;
	private String textoIngles;
	private double pesoTraco;
	// Relacionamentos 1
	private TracoPersonalidade TracoPersonalidade;
	// Relacionamentos N
	private List<RespostaFormulario> RespostaFormularios;

	public void setId(Long id) {
		this.setIdObjeto(id);
	}
	public void setId(Integer id) {
		this.setIdObjeto(id);
	}

	public int getIdInteger() {
		return new Integer(getId().toString());
	}
	public long getIdLong() {
		return new Long(getId().toString());
	}

	public JSONObject getJSON() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("id",getId());
			obj.put("texto", texto);
			obj.put("textoIngles", textoIngles);
			obj.put("pesoTraco", pesoTraco);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}


	public void setTexto(String valor) { 
		this.texto = valor;
	}
	public String getTexto() { 
		return this.texto;
	}
	public void setTextoIngles(String valor) { 
		this.textoIngles = valor;
	}
	public String getTextoIngles() { 
		return this.textoIngles;
	}
	public void setPesoTraco(double valor) { 
		this.pesoTraco = valor;
	}
	public double getPesoTraco() { 
		return this.pesoTraco;
	}

	public TracoPersonalidade getTracoPersonalidade() {
		return TracoPersonalidade;
	}
	public void setTracoPersonalidade(HashMap valor) {
		this.TracoPersonalidade = new TracoPersonalidade();
		BeanUtil.setProperties(this.TracoPersonalidade, (Map<String, ? extends Object>) valor, true);
	}
	public List<RespostaFormulario> getRespostaFormularios() {
		return  RespostaFormularios;
	}
	public void setRespostaFormularios(List<RespostaFormulario> valores) {
		this.RespostaFormularios = new ArrayList<RespostaFormulario>();
		for (int i = 0; i < valores.size(); i++) {
			Object objeto = new RespostaFormulario();
			System.out.println(" --> ObjetoMap ");
			BeanUtil.setProperties(objeto, (Map<String, ? extends Object>) valores.get(i), true);
			this.RespostaFormularios.add((RespostaFormulario) objeto);
		}
	}
}
